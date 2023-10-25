import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';
import useConfirm from '_common/hooks/useConfirm';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  Input,
  Modal,
  Spin,
  TextArea,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import ConfigPermissionApi from '../../_api';
import { IForm } from '../../interfaces';
import { REGEX } from '_common/constants/common';
const schema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required('Vui lòng chọn trường này!')
      .matches(REGEX.CODE, 'Mã quyền không dấu và chỉ cho phép chứa ký tự "_"')
      .trim()
      .max(191, 'Không nhập quá 191 ký tự'),
    title: yup
      .string()
      .required('Vui lòng chọn trường này!')
      .trim()
      .max(255, 'Không nhập quá 255 ký tự'),
    note: yup.string().nullable(),
  })
  .required();
interface FormConfigPermissionProps {
  open: boolean;
  id: number;
  onClose: () => void;
}
const FormConfigPermission = ({
  open,
  id,
  onClose,
}: FormConfigPermissionProps) => {
  const confirm = useConfirm();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    resolver: yupResolver<IForm>(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      code: '',
      note: '',
    },
  });

  const queryClient = useQueryClient();
  const {
    data: dataDetail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
  } = useQuery(
    ['get-detail-config-permission', id],
    () => ConfigPermissionApi.getDetail(id),
    {
      enabled: !!id,
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const handleClose = () => {
    onClose();
    reset();
  };

  const { mutate: mutateFormPermission } = useMutation(
    (variables: IForm) => {
      if (id) return ConfigPermissionApi.update(id, variables);
      return ConfigPermissionApi.create(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          queryClient.invalidateQueries(['get-config-permission']);
          handleClose();
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({ message: errorMessage });
      },
    },
  );

  const handleSubmitForm = (values: IForm) => {
    mutateFormPermission({
      ...values,
    });
  };

  const onCloseModal = () => {
    if (isDirty) {
      confirm.warning({
        title: 'Thoát bản ghi',
        content: (
          <>
            <p>{messageWarning.WARNING_EXIT_1}</p>
            <p>{messageWarning.WARNING_EXIT_2}</p>
          </>
        ),
        onOk: () => {
          handleClose();
        },
      });
    } else handleClose();
  };

  useEffect(() => {
    if (dataDetail) {
      reset({
        code: dataDetail?.code_guard,
        note: dataDetail?.note,
        title: dataDetail?.title,
      });
    }
  }, [dataDetail]);

  useEffect(() => {
    if (id) refetchDetail();
  }, [id]);

  return (
    <Modal
      title={id ? 'Sửa quyền' : 'Thêm quyền'}
      okText="Lưu"
      cancelText="Hủy"
      className="lg:w-1/5"
      open={open}
      onCancel={onCloseModal}
      onOk={() => handleSubmit(handleSubmitForm)()}
      closeIcon={false}
    >
      <Spin spinning={loadingDetail && !!id}>
        <Form>
          <FormItem
            label="Mã quyền"
            isError={!!errors.code}
            messages={errors?.code?.message}
          >
            <Input {...register('code')} placeholder="Vui lòng nhập" />
          </FormItem>
          <FormItem
            label="Tiêu đề"
            isError={!!errors.title}
            messages={errors?.title?.message}
          >
            <Input {...register('title')} placeholder="Vui lòng nhập" />
          </FormItem>
          <FormItem
            label="Ghi chú"
            isRequired={false}
            isError={!!errors.note}
            messages={errors?.note?.message}
          >
            <TextArea {...register('note')} placeholder="Vui lòng nhập" />
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
};

export default FormConfigPermission;
