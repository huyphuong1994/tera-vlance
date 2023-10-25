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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX } from '../../../../../_common/constants/common';
import {
  messageError,
  messageWarning,
} from '../../../../../_common/constants/message';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import EquipmentPageApi from '../../_api';
import { filterField } from '../../../../../_common/utils';
import { IFormEquipment } from '../../interfaces';
import CategoryPageApi from '../../../Category/_api';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự!'),
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự!')
    .matches(REGEX.CODE, "Mã thiết bị không dấu và chỉ chứa kí tự '_'"),
  group_code: yup.string(),
  attribute: yup.string(),
  made_in: yup.string().nullable(),
  made_at: yup.string(),
  used_at: yup.string(),
  origin_value: yup.number(),
  remain_value: yup.number(),
  depreciation_unit: yup.string(),
  return_expected_at: yup.string(),
  wait_work_at: yup.string(),
});

interface IParams {
  page: number;
  limit: number;
}

const EquipmentForm = (props: IProps) => {
  const [params] = useState<IParams>();

  const { open = false, id, onClose, onRefetch } = props;
  const {
    register,
    control,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormEquipment>({
    resolver: yupResolver<IFormEquipment>(schema),
    mode: 'onChange',
    defaultValues: {
      made_at: moment().format('YYYY'),
      used_at: moment().format('YYYY'),
      return_expected_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      wait_work_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  });

  const confirm = useConfirm();

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-equipment', id],
    () => EquipmentPageApi.getDetailEquipment(id),
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
    (variable: IFormEquipment) => {
      if (id) return EquipmentPageApi.updateEquipment(variable, id);
      return EquipmentPageApi.createEquipment(variable);
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

  const handleSubmitForm = (values: IFormEquipment): void => {
    if (loadingSubmit) return;
    submitForm(values);
  };

  const { data: listCategory } = useQuery(
    ['get-equipment-category-list', params],
    () =>
      CategoryPageApi.getEqpCategoryList({
        params: filterField({ ...params }),
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const optionListCategory = useMemo(() => {
    const option = listCategory?.data?.map((category: any) => {
      return {
        label: category.title,
        value: category.code,
      };
    });

    return option || [];
  }, [listCategory]);

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
    <Modal
      centered={true}
      title={id ? 'SỬA THIẾT BỊ' : 'THÊM THIẾT BỊ'}
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
        <Form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="grid grid-cols-2 gap-x-8"
        >
          <div>
            <FormItem
              className="mb-5"
              label="Tên thiết bị"
              isError={!!errors?.name}
              messages={errors?.name?.message as string}
            >
              <Input
                {...register('name')}
                placeholder="Vui lòng nhập"
                className="w-full"
              />
            </FormItem>
            <FormItem
              className="mb-5"
              label="Mã thiết bị"
              isError={!!errors?.code}
              messages={errors?.code?.message as string}
            >
              <Input
                {...register('code')}
                placeholder="Vui lòng nhập"
                className="w-full"
              />
            </FormItem>
            <FormItem
              className="mb-5"
              label="Nhóm"
              isError={!!errors?.group_code}
              messages={errors?.group_code?.message as string}
            >
              <Controller
                name="group_code"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      options={optionListCategory}
                      placeholder="Vui lòng chọn"
                      className="w-full"
                      {...field}
                    />
                  );
                }}
              />
            </FormItem>
            <FormItem
              className="mb-5"
              label="Đặc tính kỹ thuật cơ bản"
              isError={!!errors?.attribute}
              messages={errors?.attribute?.message as string}
            >
              <TextArea
                rows={22}
                style={{ resize: 'none' }}
                placeholder="Vui lòng nhập"
                {...register('attribute')}
              />
            </FormItem>
          </div>
          <div>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Nơi sản xuất"
              isError={!!errors?.made_in}
              messages={errors?.made_in?.message as string}
            >
              <Input
                {...register('made_in')}
                placeholder="Vui lòng nhập"
                className="w-full"
              />
            </FormItem>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Năm sản xuất"
              isError={!!errors?.made_at}
              messages={errors?.made_at?.message as string}
            >
              <Controller
                name="made_at"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      format={'YYYY'}
                      value={moment(field.value, 'YYYY')}
                      onChange={(date) => {
                        field.onChange(moment(date, 'YYYY').format('YYYY'));
                      }}
                      picker="year"
                    />
                  );
                }}
              />
            </FormItem>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Năm sử dụng"
              isError={!!errors?.used_at}
              messages={errors?.used_at?.message as string}
            >
              <Controller
                name="used_at"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    format={'YYYY'}
                    value={moment(field.value, 'YYYY')}
                    onChange={(date) => {
                      field.onChange(moment(date, 'YYYY').format('YYYY'));
                    }}
                    picker="year"
                  />
                )}
              />
            </FormItem>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Nguyên giá"
              isError={!!errors?.origin_value}
              messages={errors?.origin_value?.message as string}
            >
              <Controller
                name="origin_value"
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
              label="Còn lại"
              isError={!!errors?.remain_value}
              messages={errors?.remain_value?.message as string}
            >
              <Controller
                name="remain_value"
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
              label="Đơn vị khấu hao"
              isError={!!errors?.depreciation_unit}
              messages={errors?.depreciation_unit?.message as string}
            >
              <Input
                {...register('depreciation_unit')}
                placeholder="Vui lòng nhập"
                className="w-full"
              />
            </FormItem>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Trả máy"
              isError={!!errors?.return_expected_at}
              messages={errors?.return_expected_at?.message as string}
            >
              <Controller
                name="return_expected_at"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    format={'YYYY-MM-DD HH:mm:ss'}
                    value={moment(field.value, 'YYYY-MM-DD HH:mm:ss')}
                  />
                )}
              />
            </FormItem>
            <FormItem
              isRequired={false}
              className="mb-5"
              label="Chờ việc"
              isError={!!errors?.wait_work_at}
              messages={errors?.wait_work_at?.message as string}
            >
              <Controller
                name="wait_work_at"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    format={'YYYY-MM-DD HH:mm:ss'}
                    value={moment(field.value, 'YYYY-MM-DD HH:mm:ss')}
                  />
                )}
              />
            </FormItem>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EquipmentForm;
