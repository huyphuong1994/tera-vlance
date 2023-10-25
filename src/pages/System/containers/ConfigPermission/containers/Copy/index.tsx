import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';
import useConfirm from '_common/hooks/useConfirm';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem, Modal, Select, notification } from 'tera-dls';
import * as yup from 'yup';
import ConfigPermissionApi from '../../_api';
import { CopyForm, RequestCopy } from '../../interfaces';
const schema = yup.object().shape({
  role_id: yup.number().required('Vui lòng chọn trường này!'),
});
interface CopyConfigPermissionProps {
  open?: boolean;
  onClose: () => void;
  id?: number;
}
const CopyConfigPermission = ({
  open,
  onClose,
  id,
}: CopyConfigPermissionProps) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<CopyForm>({
    resolver: yupResolver<CopyForm>(schema),
    mode: 'onChange',
    defaultValues: {
      role_id: null,
    },
  });
  const { data: listPermission } = useQuery(
    ['get-config-permission', { limit: 10, page: 1, id }],
    () => ConfigPermissionApi.getList({ limit: 10, page: 1, role_id: id }),
    { cacheTime: 300000, staleTime: 300000 },
  );
  const handleClose = () => {
    onClose();
    reset();
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

  const { mutate: mutateCopyConfigPermission } = useMutation(
    (variables: RequestCopy) => {
      return ConfigPermissionApi.copy(variables);
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

  const optionsPermission = listPermission?.data?.map((permission) => ({
    value: permission.id,
    label: permission.title,
  }));
  const handleSubmitForm = (values: CopyForm) => {
    mutateCopyConfigPermission({
      role_target_id: values.role_id,
      role_id: id,
    });
  };
  return (
    <Modal
      title="Sao chép quyền"
      okText="Lưu"
      cancelText="Huỷ"
      width="20vw"
      open={open}
      onCancel={onCloseModal}
      onOk={() => handleSubmit(handleSubmitForm)()}
      closeIcon={false}
    >
      <Form>
        <FormItem
          label="Mã quyền"
          isError={!!errors.role_id}
          messages={errors?.role_id?.message}
        >
          <Controller
            name="role_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                options={optionsPermission}
                placeholder="Vui lòng chọn"
                {...field}
              />
            )}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CopyConfigPermission;
