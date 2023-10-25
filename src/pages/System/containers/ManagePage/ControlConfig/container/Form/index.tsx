import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';
import useConfirm from '_common/hooks/useConfirm';
import { convertListOrder } from '_common/utils';
import { memo, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  Input,
  Modal,
  OptionProps,
  Select,
  Spin,
  Toggle,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import ControlConfigApi from '../../_api';
import { IForm, RequestControl } from '../../interfaces';
import { REGEX } from '_common/constants/common';
const schema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required('Vui lòng chọn trường này!')
      .matches(
        REGEX.CODE,
        'Mã control không dấu và chỉ cho phép chứa ký tự "_"',
      )
      .trim()
      .max(191, 'Không nhập quá 191 ký tự'),
    title: yup
      .string()
      .required('Vui lòng chọn trường này!')
      .trim()
      .max(255, 'Không nhập quá 255 ký tự'),
    value: yup.string().nullable(),
    group_id: yup.number().nullable().required('Vui lòng chọn trường này!'),
    color: yup.string().nullable(),
    class_name: yup.string().nullable(),
    order: yup.number().nullable(),
    status: yup.boolean().nullable(),
  })
  .required();
interface FormControlConfigProps {
  open: boolean;
  controlId?: number;
  pageId?: number;
  onClose: () => void;
}
const FormControlConfig = memo(
  ({ open, controlId, pageId, onClose }: FormControlConfigProps) => {
    const {
      handleSubmit,
      reset,
      register,
      control,
      watch,
      formState: { errors, isDirty },
    } = useForm<IForm>({
      resolver: yupResolver<IForm>(schema),
      mode: 'onChange',
      defaultValues: {
        code: '',
        class_name: '',
        color: '',
        group_id: null,
        order: null,
        status: true,
        title: '',
        value: '',
      },
    });
    const confirm = useConfirm();
    const group_id = watch('group_id');
    const queryClient = useQueryClient();
    const [
      { data: dataDetail, isLoading: loadingDetail },
      { data: listGroup },
      { data: listOrderControl },
    ] = useQueries({
      queries: [
        {
          queryKey: ['get-detail-control-config', controlId],
          queryFn: () => ControlConfigApi.getDetail(controlId),
          enabled: !!controlId,
        },
        {
          queryKey: ['get-list-group-control'],
          queryFn: () => ControlConfigApi.getListGroupControl(),
          cacheTime: 300000,
          staleTime: 300000,
        },
        {
          queryKey: ['get-list-order-control', group_id, pageId],
          queryFn: () =>
            ControlConfigApi.getListOrderControl({
              group_id: group_id,
              page_id: pageId,
            }),
          enabled: !!pageId && !!group_id,
        },
      ],
    });

    const handleClose = () => {
      onClose();
      reset();
    };

    const optionsOrderControl: OptionProps[] = useMemo(() => {
      return convertListOrder(listOrderControl, pageId, dataDetail);
    }, [listOrderControl, dataDetail]);

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

    const { mutate: mutateConfigControl } = useMutation(
      (variables: RequestControl) => {
        if (controlId)
          return ControlConfigApi.update({ id: controlId, values: variables });
        return ControlConfigApi.create(variables);
      },
      {
        onSuccess: (res) => {
          if (res?.code === 200) {
            queryClient.invalidateQueries(['get-list-control-config']);
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
      mutateConfigControl({
        class_name: values.class_name,
        code: values.code,
        color: values.color,
        group_id: values.group_id,
        order: values.order,
        title: values.title,
        value: values.value,
        page_id: pageId,
        status: values.status ? 'active' : 'inactive',
      });
    };

    useEffect(() => {
      if (dataDetail) {
        reset({
          ...dataDetail,
          order: dataDetail?.item_prev_order?.order || 0,
          code: dataDetail.code_guard,
          status: dataDetail.status === 'active' ? true : false,
        });
      }
    }, [dataDetail]);

    const optionsGroup = listGroup?.map((item) => ({
      value: item.id,
      label: item.title,
    }));

    return (
      <Modal
        title={controlId ? 'Sửa control' : 'Thêm control'}
        okText="Lưu"
        cancelText="Hủy"
        open={open}
        onCancel={onCloseModal}
        onOk={() => handleSubmit(handleSubmitForm)()}
        closeIcon={false}
      >
        <Spin spinning={loadingDetail && !!controlId}>
          <Form>
            <FormItem
              label="Mã control"
              isError={!!errors.code}
              messages={errors?.code?.message}
              help={
                <>
                  Nhập thông tin{' '}
                  <span className="font-medium text-gray-800">[control]</span>,
                  hệ thống sẽ tự gán theo Format:
                  <span className="font-medium text-gray-800">
                    [module]_[page]_[control]
                  </span>
                </>
              }
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
              label="Giá trị"
              isError={!!errors.value}
              isRequired={false}
              messages={errors?.value?.message}
            >
              <Input {...register('value')} placeholder="Vui lòng nhập" />
            </FormItem>
            <FormItem
              label="Nhóm control"
              isError={!!errors.group_id}
              messages={errors?.group_id?.message}
            >
              <Controller
                control={control}
                name="group_id"
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Vui lòng nhập"
                    options={optionsGroup}
                  />
                )}
              />
            </FormItem>
            <FormItem
              label="Màu sắc"
              isRequired={false}
              isError={!!errors.color}
              messages={errors?.color?.message}
            >
              <Input {...register('color')} placeholder="Vui lòng nhập" />
            </FormItem>
            <FormItem
              label="className"
              isRequired={false}
              isError={!!errors.class_name}
              messages={errors?.class_name?.message}
            >
              <Input {...register('class_name')} placeholder="Vui lòng nhập" />
            </FormItem>
            <FormItem
              label="Thứ tự đứng sau"
              isRequired={false}
              isError={!!errors.order}
              messages={errors?.order?.message}
            >
              <Controller
                control={control}
                name="order"
                render={({ field }) => (
                  <Select
                    {...field}
                    allowClear
                    placeholder="Vui lòng nhập"
                    options={optionsOrderControl}
                  />
                )}
              />
            </FormItem>
            <FormItem
              label="Trạng thái"
              isRequired={false}
              isError={!!errors.status}
              messages={errors?.status?.message}
            >
              <Toggle {...register('status')} />
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  },
);

export default FormControlConfig;
