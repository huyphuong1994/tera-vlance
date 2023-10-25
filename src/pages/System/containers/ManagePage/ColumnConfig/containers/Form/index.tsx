import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  Modal,
  OptionProps,
  Row,
  Select,
  Spin,
  Toggle,
  notification,
} from 'tera-dls';
import * as yup from 'yup';

import { messageError, messageWarning } from '_common/constants/message';
import useConfirm from '_common/hooks/useConfirm';
import { IForm } from '../../interfaces';
import { align, dataType, unit } from '../../../constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import ColumnConfigApi from '../../_api';
import { useEffect, useState } from 'react';
import SelectColumnConfig from '_common/dof/Select/SelectColumnConfig';
import { REGEX } from '_common/constants/common';

interface ColumnConfigFormProps {
  id: string | number;
  tableId: string | number;
  open: boolean;
  onRefetch: () => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .matches(REGEX.CODE, 'Mã cột không dấu và chỉ chứa kí tự "_"')
    .max(191, 'Không nhập quá 191 ký tự')
    .trim(),
  title: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .max(255, 'Không nhập quá 255 ký tự')
    .trim(),
  type: yup.string().required('Vui lòng chọn trường này!'),
  key: yup.string().nullable().trim().max(255, 'Không nhập quá 255 ký tự'),
  class_name: yup
    .string()
    .nullable()
    .trim()
    .max(255, 'Không nhập quá 255 ký tự'),
  width: yup
    .number()
    .nullable()
    .when('unit', {
      is: 'percent',
      then: (schema) => schema.max(100, 'Không nhập quá 100'),
      otherwise: (schema) => schema,
    }),
  unit: yup.string().nullable(),
  align: yup.string().nullable(),
  stand_behind: yup.number().nullable(),
  status: yup.boolean().nullable(),
  show_desktop: yup
    .number()
    .nullable()
    .transform((_, value) => (value ? 1 : 0)),
  hide_tablet_lg: yup
    .number()
    .nullable()
    .transform((_, value) => (value ? 1 : 0)),
  hide_tablet: yup
    .number()
    .nullable()
    .transform((_, value) => (value ? 1 : 0)),
  show_mobile: yup
    .number()
    .nullable()
    .transform((_, value) => (value ? 1 : 0)),
});

const optionsCustom: OptionProps = {
  label: 'Đứng đầu',
  value: 0,
};

function ColumnConfigForm({
  open,
  onClose,
  onRefetch,
  id,
  tableId,
}: ColumnConfigFormProps) {
  const confirm = useConfirm();

  const [standBehindSelected, setStandBehindSelected] =
    useState<OptionProps>(null);

  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<IForm>(schema),
    defaultValues: {
      unit: 'px',
    },
  });

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-config', id],
    () => ColumnConfigApi.getDetail(id),
    {
      enabled: !!id,
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const handleClose = () => {
    onClose();
    reset();
  };

  const { mutate: submitForm, isLoading: loadingSubmit } = useMutation(
    (variable: IForm) => {
      const data = {
        ...variable,
        table_id: +tableId,
      };
      if (id) return ColumnConfigApi.update(id, data);
      return ColumnConfigApi.create(data);
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
        onOk: () => {
          handleClose();
        },
      });
    } else {
      handleClose();
    }
  };

  const handleSubmitForm = (values: IForm) => {
    if (loadingSubmit) return;
    const data: any = {
      ...values,
      status: values?.status ? 'active' : 'inactive',
    };
    submitForm(data);
  };

  const optionsDataType = Object.keys(dataType).map((key) => ({
    label: dataType[key],
    value: key,
  }));

  const optionsAlign = Object.keys(align).map((key) => ({
    label: align[key],
    value: key,
  }));

  const optionsUnit = Object.keys(unit).map((key) => ({
    label: unit[key],
    value: key,
  }));

  useEffect(() => {
    if (detailColumn && id) {
      console.log('detailColumn', detailColumn);
      const values: IForm = {
        code: detailColumn?.code,
        title: detailColumn?.title,
        type: detailColumn?.type,
        key: detailColumn?.key,
        class_name: detailColumn?.class_name,
        width: detailColumn?.width,
        unit: detailColumn?.unit,
        align: detailColumn?.align,
        stand_behind: !!detailColumn?.standing_behind
          ? detailColumn?.standing_behind?.id
          : detailColumn?.standing_behind,
        status: detailColumn?.status === 'active' ? true : false,
        show_desktop: detailColumn?.show_desktop,
        hide_tablet_lg: detailColumn?.hide_tablet_lg,
        hide_tablet: detailColumn?.hide_tablet,
        show_mobile: detailColumn?.show_mobile,
      };

      if (detailColumn?.standing_behind)
        setStandBehindSelected({
          label: detailColumn?.standing_behind?.title,
          value: detailColumn?.standing_behind?.id,
        });
      else setStandBehindSelected(optionsCustom);

      Object.entries(values).forEach(([fieldName, fieldValue]: [any, any]) => {
        setValue(fieldName, fieldValue);
      });
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
      centered
      closeIcon={false}
      open={open}
      okText="Lưu"
      cancelText="Hủy"
      title={id ? 'SỬA CỘT DỮ LIỆU' : 'THÊM CỘT DỮ LIỆU'}
      className="md:w-[700px]"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={handleCloseConfirm}
      confirmLoading={(isLoading && !!id) || loadingSubmit}
    >
      <Spin spinning={isLoading && !!id}>
        <Form onSubmit={handleSubmit(handleSubmitForm)} className="h-full">
          <Row className="grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
            <Col>
              <FormItem
                label="Mã cột dữ liệu"
                isError={!!errors?.code}
                messages={errors?.code?.message}
                help={
                  <span className="text-gray-400 text-[10px]">
                    Nhập thông tin{' '}
                    <span className="text-gray-800">[column]</span>, hệ thống sẽ
                    tự gán theo Format:
                    <span className="text-gray-800">
                      [module]_[page]_[table]_[column]
                    </span>
                  </span>
                }
              >
                <Input placeholder="Vui lòng nhập" {...register('code')} />
              </FormItem>
              <FormItem
                label="Tiêu đề"
                isError={!!errors?.title}
                messages={errors?.title?.message}
              >
                <Input placeholder="Vui lòng nhập" {...register('title')} />
              </FormItem>
              <FormItem
                label="Loại dữ liệu"
                isError={!!errors?.type}
                messages={errors?.type?.message}
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={optionsDataType}
                      placeholder="Vui lòng chọn"
                      {...field}
                    />
                  )}
                />
              </FormItem>
              <FormItem label="Key dữ liệu" isRequired={false}>
                <Input placeholder="Vui lòng nhập" {...register('key')} />
              </FormItem>
              <FormItem label="className" isRequired={false}>
                <Input
                  placeholder="Vui lòng nhập"
                  {...register('class_name')}
                />
              </FormItem>
              <FormItem
                label="Độ rộng"
                isRequired={false}
                isError={!!errors?.width}
                messages={errors?.width?.message}
              >
                <div className="flex items-center gap-x-2.5">
                  <Controller
                    name="width"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        min={0}
                        max={watch('unit') === 'percent' ? 100 : undefined}
                        placeholder="Vui lòng nhập"
                        className="basis-4/5"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="basis-1/5"
                        options={optionsUnit}
                        placeholder=""
                        {...field}
                      />
                    )}
                  />
                </div>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="Căn lề" isRequired={false}>
                <Controller
                  name="align"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={optionsAlign}
                      placeholder="Vui lòng chọn"
                      {...field}
                    />
                  )}
                />
              </FormItem>
              <FormItem label="Thứ tự đứng sau" isRequired={false}>
                <Controller
                  name="stand_behind"
                  control={control}
                  render={({ field }) => (
                    <SelectColumnConfig
                      {...field}
                      idPrevent={Number(id)}
                      optionCustom={[optionsCustom]}
                      selectedValue={standBehindSelected}
                      onSelect={(_, value) => setStandBehindSelected(value)}
                      paramsApi={{ table_id: tableId }}
                      isRefetch
                    />
                  )}
                />
              </FormItem>
              <FormItem label="Trạng thái" isRequired={false}>
                <Toggle {...register('status')} />
              </FormItem>
              <FormItem
                label="Hiển thị trên Desktop (>1600px)"
                isRequired={false}
              >
                <Toggle {...register('show_desktop')} />
              </FormItem>
              <FormItem
                label="Hiển thị trên Table lớn (>1200px)"
                isRequired={false}
              >
                <Toggle {...register('hide_tablet_lg')} />
              </FormItem>
              <FormItem
                label="Hiển thị trên Table nhỏ (>960px)"
                isRequired={false}
              >
                <Toggle {...register('hide_tablet')} />
              </FormItem>
              <FormItem
                label="Hiển thị trên mobile (<768px)"
                isRequired={false}
              >
                <Toggle {...register('show_mobile')} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ColumnConfigForm;
