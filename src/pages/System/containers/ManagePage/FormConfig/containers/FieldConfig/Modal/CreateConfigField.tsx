import { yupResolver } from '@hookform/resolvers/yup';
import useConfirm from '_common/hooks/useConfirm';

import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { messageError } from '_common/constants/message';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  Col,
  Form,
  FormItem,
  Input,
  Modal,
  OptionProps,
  Row,
  Select,
  Spin,
  Toggle,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import { FieldConfigApi } from '../../../_api';
import { convertListOrder } from '_common/utils';
import { REGEX } from '_common/constants/common';

interface IDetailEmployeeGroup {
  id?: number;
  isOpen?: boolean;
  handleClose?: () => void;
}
interface IForm {
  code: string;
  title: string;
  type: string;
  keyData: string;
  className: string;
  placeholder: string;
  priority: string | number;
  allowEdit: boolean | string;
  disableWhenEdit: boolean | string;
  allowAdd: boolean | string;
  isRequire: boolean | string;
}

const schema = yup.object().shape({
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .matches(REGEX.CODE, 'Mã field không dấu và chỉ cho phép chứa ký tự "_"')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự'),
  title: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự'),
  type: yup
    .string()
    .required('Vui lòng chọn trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự'),
  keyData: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  className: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  placeholder: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  priority: yup
    .mixed()
    .test('is-string-or-number', 'Giá trị phải là chuỗi hoặc số', (value) => {
      return typeof value === 'string' || typeof value === 'number';
    }),
  allowEdit: yup
    .mixed()
    .test(
      'is-string-or-boolean',
      'Giá trị phải là chuỗi hoặc boolean',
      (value) => {
        return typeof value === 'string' || typeof value === 'boolean';
      },
    ),
  disableWhenEdit: yup
    .mixed()
    .test(
      'is-string-or-boolean',
      'Giá trị phải là chuỗi hoặc boolean',
      (value) => {
        return typeof value === 'string' || typeof value === 'boolean';
      },
    ),
  allowAdd: yup
    .mixed()
    .test(
      'is-string-or-boolean',
      'Giá trị phải là chuỗi hoặc boolean',
      (value) => {
        return typeof value === 'string' || typeof value === 'boolean';
      },
    ),
  isRequire: yup
    .mixed()
    .test(
      'is-string-or-boolean',
      'Giá trị phải là chuỗi hoặc boolean',
      (value) => {
        return typeof value === 'string' || typeof value === 'boolean';
      },
    ),
});

const CreateConfigField = ({
  id,
  isOpen,
  handleClose,
}: IDetailEmployeeGroup) => {
  const defaultValues = {
    code: '',
    title: '',
    type: '',
    keyData: '',
    className: '',
    placeholder: '',
    priority: '',
    allowEdit: false,
    disableWhenEdit: false,
    allowAdd: false,
    isRequire: false,
  };
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { formId } = useParams();

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    control,
    register,
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<any>(schema),
    defaultValues,
  });

  const [
    { data: fieldDetail, isLoading: loadingDetail },
    { data: listFieldType },
    { data: listFieldOrder },
  ] = useQueries({
    queries: [
      {
        queryKey: ['edit_field_config'],
        queryFn: () => {
          return FieldConfigApi.getDetail(id);
        },
        enabled: !!id,
      },
      {
        queryKey: ['list_type_field'],
        queryFn: () => {
          return FieldConfigApi.getFieldType();
        },
      },
      {
        queryKey: ['list_order_field'],
        queryFn: () => {
          return FieldConfigApi.getFieldOrder({
            form_id: id ? fieldDetail?.form_id : Number(formId),
          });
        },
      },
    ],
  });

  const optionsFieldType: OptionProps[] = useMemo(() => {
    return isArray(listFieldType?.data)
      ? listFieldType?.data.map((type) => ({
          value: type?.id,
          label: type?.title,
        }))
      : [];
  }, [listFieldType?.data]);

  const optionsFormOrder: OptionProps[] = useMemo(() => {
    return convertListOrder(listFieldOrder, id, fieldDetail);
  }, [listFieldOrder, fieldDetail]);

  const handleResetForm = () => {
    reset();
    queryClient.setQueryData(['list_order_field'], null);
  };

  const handleCancel = () => {
    handleClose();
    handleResetForm();
  };

  const { mutate: handleMutation, isLoading } = useMutation(
    (variables: any) => {
      if (id) {
        return FieldConfigApi.update(id, variables);
      }

      return FieldConfigApi.create(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          handleCancel();
          notification.success({
            message: msg,
          });
          queryClient.invalidateQueries(['list-field-config']);
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

  const checkTypeStatus = (status: boolean | string, type: string) => {
    if (type === 'submit') {
      return status ? 'active' : 'inactive';
    }
    return status === 'active' ? true : false;
  };

  const handleSubmitForm = (valueForm: IForm) => {
    const convertData = {
      form_id: id ? fieldDetail?.form_id : Number(formId),
      code: valueForm?.code,
      title: valueForm?.title,
      order: valueForm?.priority ? Number(valueForm?.priority) : null,
      type_id: Number(valueForm?.type),
      key_data: valueForm?.keyData,
      class_name: valueForm?.className,
      place_holder: valueForm?.placeholder,
      is_create: checkTypeStatus(valueForm?.allowAdd, 'submit'),
      is_required: checkTypeStatus(valueForm?.isRequire, 'submit'),
      disable_edit: checkTypeStatus(valueForm?.disableWhenEdit, 'submit'),
      is_edit: checkTypeStatus(valueForm?.allowEdit, 'submit'),
    };
    handleMutation(convertData);
  };

  useEffect(() => {
    if (!!id && fieldDetail) {
      const values: IForm = {
        code: fieldDetail?.code_guard,
        title: fieldDetail?.title,
        type: fieldDetail?.type_field?.id,
        keyData: fieldDetail?.key_data,
        className: fieldDetail?.class_name,
        placeholder: fieldDetail?.place_holder,
        priority: fieldDetail?.item_prev_order?.order || 0,
        allowEdit: checkTypeStatus(fieldDetail?.is_edit, 'edit'),
        disableWhenEdit: checkTypeStatus(fieldDetail?.disable_edit, 'edit'),
        allowAdd: checkTypeStatus(fieldDetail?.is_create, 'edit'),
        isRequire: checkTypeStatus(fieldDetail?.is_required, 'edit'),
      };
      Object.entries(values).forEach(([fieldName, fieldValue]: [any, any]) => {
        setValue(fieldName, fieldValue);
      });
    }
  }, [fieldDetail, id]);

  const onExitModal = () => {
    if (isDirty) {
      confirm.warning({
        title: 'Thoát bản ghi',
        onOk: () => {
          handleCancel();
        },
        content: (
          <>
            <p>Bạn có chắc muốn thoát bản ghi này không?</p>
            <p>Sau khi thoát dữ liệu sẽ không được lưu.</p>
          </>
        ),
      });
      return;
    }
    handleCancel();
  };

  return (
    <>
      <Modal
        centered={true}
        title={`${id ? 'Sửa trường dữ liệu' : 'Thêm trường dữ liệu'}`}
        open={isOpen}
        onCancel={onExitModal}
        onOk={handleSubmit(handleSubmitForm)}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        className="sm:w-[65%] md:w-[65%] lg:w-[50%]"
        confirmLoading={isLoading}
        destroyOnClose
      >
        <Spin spinning={!!id && loadingDetail}>
          <Form
            className="overflow-auto h-full"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Row className="grid-cols-2 gap-x-10">
              <Col>
                <Col>
                  <FormItem
                    isError={!!errors.code}
                    messages={errors?.code?.message}
                    label="Mã trường dữ liệu"
                    help={
                      <span className="text-gray-400 lg:text-xs md:text-[10px] sm:text-[10px]">
                        Nhập thông tin{' '}
                        <span className="text-gray-800">[field]</span>, hệ thống
                        sẽ tự gán theo Format:{' '}
                        <span className="text-gray-800">
                          [module]_[page]_[form]_[field]
                        </span>
                      </span>
                    }
                  >
                    <Controller
                      name="code"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="mb-2"
                          placeholder="Vui lòng nhập"
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem
                    isError={!!errors.title}
                    messages={errors?.title?.message}
                    label="Tiêu đề"
                  >
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Vui lòng nhập" {...field} />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem
                    isError={!!errors.type}
                    messages={errors?.type?.message}
                    label="Loại dữ liệu"
                  >
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          allowClear
                          placeholder="Vui lòng chọn"
                          options={optionsFieldType}
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Key dữ liệu">
                    <Controller
                      name="keyData"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Vui lòng nhập" {...field} />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="ClassName">
                    <Controller
                      name="className"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Vui lòng nhập" {...field} />
                      )}
                    />
                  </FormItem>
                </Col>
              </Col>
              <Col>
                <Col>
                  <FormItem isRequired={false} label="Placeholder">
                    <Controller
                      name="placeholder"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Vui lòng nhập" {...field} />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Thứ tự đứng sau">
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <Select
                          allowClear
                          placeholder="Vui lòng chọn"
                          options={optionsFormOrder}
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Cho phép chỉnh sửa">
                    <Toggle {...register('allowEdit')} />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Disable khi chỉnh sửa">
                    <Toggle {...register('disableWhenEdit')} />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Cho phép thêm mới">
                    <Toggle {...register('allowAdd')} />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Bắt buộc">
                    <Toggle {...register('isRequire')} />
                  </FormItem>
                </Col>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default CreateConfigField;
