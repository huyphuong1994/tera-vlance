import {
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Spin,
  TextArea,
} from 'tera-dls';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment/moment';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormEquipmentFix } from '../../interfaces';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  messageError,
  messageWarning,
} from '../../../../../../../_common/constants/message';
import { EquipmentFixApi } from '../../_api';
import { HrmApi } from '../../../../../../../_common/dof/_api';
import { useParams } from 'react-router-dom';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  equipment_id: yup.number().required('Vui lòng nhập trường này!'),
  fixed_at: yup.string().required('Vui lòng nhập trường này!'),
  payment_at: yup.string(),
  user_follow: yup.number().required('Vui lòng nhập trường này!'),
  location: yup.string(),
  quantity: yup.number().required('Vui lòng nhập trường này!'),
  vat: yup
    .number()
    .min(0, 'Giá trị từ chỉ từ 0-100!')
    .max(100, 'Giá trị từ chỉ từ 0-100!'),
  units: yup.string(),
  price: yup.number().required('Vui lòng nhập trường này!'),
  content: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .max(500, 'Không nhập quá 191 ký tự!'),
});

function FormFix(props: IProps) {
  const confirm = useConfirm();
  const { equipmentId } = useParams();
  const { open = false, id, onClose, onRefetch } = props;
  const {
    register,
    control,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormEquipmentFix>({
    resolver: yupResolver<IFormEquipmentFix>(schema),
    mode: 'onChange',
    defaultValues: {
      equipment_id: +equipmentId,
      fixed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      payment_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  });

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-equipment', id],
    () => EquipmentFixApi.getEquipmentFixDetail(id),
    {
      enabled: !!id,
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const { mutate: submitForm, isLoading: loadingSubmit } = useMutation(
    (variable: IFormEquipmentFix) => {
      if (id) return EquipmentFixApi.updateEquipmentFix(variable, id);
      return EquipmentFixApi.createEquipmentFix(variable);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          onRefetch();
          handleClose();
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const handleCloseConfirm = () => {
    if (loadingSubmit) return;
    if (isDirty) {
      confirm.warning({
        title: 'Thoát bản ghi',
        content: (
          <>
            <p>{messageWarning.WARNING_EXIT_1}</p>
            <p>{messageWarning.WARNING_EXIT_2}</p>
          </>
        ),
        className: 'modal-button-center',
        onOk: () => {
          handleClose();
        },
      });
    } else {
      handleClose();
    }
  };

  const { data: listEmployee } = useQuery(
    ['get-employee'],
    () =>
      HrmApi.getListEmployee({
        page: 1,
        limit: 10,
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const listOptionEmployee = listEmployee?.data?.data?.map((item) => {
    return {
      label: item.full_name,
      value: item.id,
    };
  });

  console.log('1', listOptionEmployee);

  const handleSubmitForm = (values: IFormEquipmentFix): void => {
    if (loadingSubmit) return;
    submitForm(values);
  };

  useEffect(() => {
    if (detailColumn && id) {
      Object.entries(detailColumn).forEach(
        ([fieldName, fieldValue]: [any, any]) => {
          setValue(fieldName, fieldValue);
        },
      );
    }
  }, [detailColumn, id]);

  useEffect(() => {
    if (id) refetch();
  }, [id]);

  if (isError) {
    onClose();
  }

  return (
    <>
      <Modal
        centered={true}
        title={id ? 'SỬA THIẾT BỊ' : 'THÊM SỬA CHỮA DỰ ÁN'}
        open={open}
        width={1000}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={() => handleSubmit(handleSubmitForm)()}
        onCancel={handleCloseConfirm}
        confirmLoading={(isLoading && !!id) || loadingSubmit}
      >
        <Spin spinning={isLoading && !!id}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <FormItem
                  className="mb-5"
                  label="Ngày sửa"
                  isError={!!errors?.fixed_at}
                  messages={errors?.fixed_at?.message as string}
                >
                  <Controller
                    name="fixed_at"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          format={'YYYY-MM-DD HH:mm:ss'}
                          value={moment(field.value, 'YYYY-MM-DD HH:mm:ss')}
                        />
                      );
                    }}
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Ngày thanh toán"
                  isError={!!errors?.payment_at}
                  messages={errors?.payment_at?.message as string}
                >
                  <Controller
                    name="payment_at"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          format={'YYYY-MM-DD HH:mm:ss'}
                          value={moment(field.value, 'YYYY-MM-DD HH:mm:ss')}
                        />
                      );
                    }}
                  />
                </FormItem>
                <FormItem
                  className="mb-5"
                  label="Người theo dõi"
                  isError={!!errors?.user_follow}
                  messages={errors?.user_follow?.message as string}
                >
                  <Controller
                    name="user_follow"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          options={listOptionEmployee}
                          placeholder="Vui lòng chọn"
                          className="w-full"
                          {...field}
                        />
                      );
                    }}
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Vị trí"
                  isError={!!errors?.location}
                  messages={errors?.location?.message as string}
                >
                  <Input
                    {...register('location')}
                    placeholder="Vui lòng nhập"
                    className="w-full"
                  />
                </FormItem>
              </div>
              <div>
                <FormItem
                  className="mb-5"
                  label="Số lượng"
                  isError={!!errors?.quantity}
                  messages={errors?.quantity?.message as string}
                >
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        placeholder="Vui lòng nhập"
                        className="basis-4/5"
                        {...field}
                      />
                    )}
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="VAT%"
                  isError={!!errors?.vat}
                  messages={errors?.vat?.message as string}
                >
                  <Controller
                    name="vat"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        min={0}
                        max={100}
                        placeholder="Vui lòng nhập"
                        className="basis-4/5"
                        {...field}
                      />
                    )}
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Đơn vị tính"
                  isError={!!errors?.units}
                  messages={errors?.units?.message as string}
                >
                  <Input
                    {...register('units')}
                    placeholder="Vui lòng nhập"
                    className="w-full"
                  />
                </FormItem>
                <FormItem
                  className="mb-5"
                  label="Giá"
                  isError={!!errors?.price}
                  messages={errors?.price?.message as string}
                >
                  <Input
                    {...register('price')}
                    placeholder="Vui lòng nhập"
                    className="w-full"
                  />
                </FormItem>
              </div>
            </div>
            <div>
              <FormItem
                className="mb-5"
                label="Nội dung"
                isError={!!errors?.content}
                messages={errors?.content?.message as string}
              >
                <TextArea
                  rows={22}
                  style={{ resize: 'none' }}
                  placeholder="Vui lòng nhập"
                  {...register('content')}
                />
              </FormItem>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default FormFix;
