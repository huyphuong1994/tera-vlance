import { yupResolver } from '@hookform/resolvers/yup';
import useConfirm from '_common/hooks/useConfirm';

import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { messageError } from '_common/constants/message';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';
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
import FormConfigApi from '../../_api';
import { listLayout } from '../../constants';
import { useParams } from 'react-router-dom';
import { convertListOrder } from '_common/utils';
import { REGEX } from '_common/constants/common';

interface IDetailEmployeeGroup {
  id?: number;
  isOpen?: boolean;
  handleClose?: () => void;
}
interface IForm {
  code: string;
  priority: string | number;
  title: string;
  layout: string;
  group: string;
  numOfColumn: number;
  className: string;
  status: boolean;
}

const schema = yup.object().shape({
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .matches(REGEX.CODE, 'Mã form không dấu và chỉ cho phép chứa ký tự "_"')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự'),
  title: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự'),
  group: yup
    .string()
    .required('Vui lòng chọn trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự'),
  priority: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  layout: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  numOfColumn: yup.number().nullable().max(255, 'Không nhập quá 255 ký tự'),
  className: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự'),
  status: yup.boolean(),
});

const CreateConfigForm = ({
  id,
  isOpen,
  handleClose,
}: IDetailEmployeeGroup) => {
  const defaultValues = {
    code: '',
    priority: '',
    title: '',
    layout: '',
    group: '',
    numOfColumn: null,
    className: '',
    status: true,
  };
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { pageId } = useParams();

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    control,
    getValues,
    register,
    watch,
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<any>(schema),
    defaultValues,
  });

  const watchLayout = watch('layout');

  const [
    { data: detailFormGroup, isLoading: loadingDetail },
    { data: listFormGroup },
    { data: listFormOrder, refetch: getListFormOrder },
  ] = useQueries({
    queries: [
      {
        queryKey: ['detail_form_group'],
        queryFn: () => {
          return FormConfigApi.getDetail(id);
        },
        enabled: !!id,
      },
      {
        queryKey: ['list_form_group'],
        queryFn: () => {
          return FormConfigApi.getFormGroup({});
        },
      },
      {
        queryKey: ['list_form_order'],
        queryFn: () => {
          const groupID = getValues('group');
          return FormConfigApi.getFormOrder({
            page_id: id ? detailFormGroup?.page_id : Number(pageId),
            group_id: Number(groupID),
          });
        },
        enabled: false,
      },
    ],
  });
  const optionsFormGroup: OptionProps[] = useMemo(() => {
    return isArray(listFormGroup?.data)
      ? listFormGroup.data.map((formGroup) => ({
          value: formGroup?.id,
          label: formGroup?.title,
        }))
      : [];
  }, [listFormGroup]);

  const optionsFormOrder: OptionProps[] = useMemo(() => {
    return convertListOrder(listFormOrder, id, detailFormGroup);
  }, [listFormOrder, detailFormGroup]);

  const handleResetForm = () => {
    reset();
    queryClient.setQueryData(['list_form_order'], null);
  };

  const handleCancel = () => {
    handleClose();
    handleResetForm();
  };

  const { mutate: handleMutation, isLoading } = useMutation(
    (variables: any) => {
      if (id) {
        return FormConfigApi.update(id, variables);
      }

      return FormConfigApi.create(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          handleCancel();
          notification.success({
            message: res?.msg,
          });
          queryClient.invalidateQueries(['list-form-config']);
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

  const checkLayout = (layout: string, column: number) => {
    if (layout === 'grid_view') {
      return column ? Number(column) : null;
    }
    return null;
  };

  const handleSubmitForm = (valueForm: IForm) => {
    console.log('valueForm', valueForm);
    const convertData = {
      page_id: id ? detailFormGroup?.page_id : Number(pageId),
      code: valueForm?.code,
      title: valueForm?.title,
      group_id: Number(valueForm?.group),
      class_name: valueForm?.className,
      order: valueForm?.priority ? Number(valueForm?.priority) : null,
      status: valueForm?.status ? 'active' : 'inactive',
      layout: valueForm?.layout, //table, grid_view
      column: checkLayout(valueForm?.layout, valueForm?.numOfColumn),
    };
    console.log('convertData', convertData);
    handleMutation(convertData);
  };

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

  useEffect(() => {
    if (!!id && detailFormGroup) {
      const values: IForm = {
        code: detailFormGroup?.code_guard,
        priority: detailFormGroup?.item_prev_order?.order || 0,
        title: detailFormGroup?.title,
        layout: detailFormGroup?.layout || '',
        group: detailFormGroup?.group_form_control?.id,
        numOfColumn: detailFormGroup?.column || '',
        className: detailFormGroup?.class_name || '',
        status: detailFormGroup?.status === 'active' ? true : false,
      };
      Object.entries(values).forEach(([fieldName, fieldValue]: [any, any]) => {
        setValue(fieldName, fieldValue);
      });
      getListFormOrder();
    }
  }, [detailFormGroup, id]);

  return (
    <>
      <Modal
        centered={true}
        title={`${
          id ? 'Sửa cấu hình form dữ liệu' : 'Thêm cấu hình form dữ liệu'
        }`}
        open={isOpen}
        onCancel={onExitModal}
        onOk={handleSubmit(handleSubmitForm)}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        className="sm:w-[65%] md:w-[65%] lg:w-[50%]"
        // width="50%"
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
                    label="Mã form dữ liệu"
                    help={
                      <span className="text-gray-400 lg:text-xs md:text-[10px] sm:text-[10px]">
                        Nhập thông tin{' '}
                        <span className="text-gray-800">[form]</span>, hệ thống
                        sẽ tự gán theo Format:{' '}
                        <span className="text-gray-800">
                          [module]_[page]_[form]
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
                    isError={!!errors.group}
                    messages={errors?.group?.message}
                    label="Nhóm form dữ liệu"
                  >
                    <Controller
                      name="group"
                      control={control}
                      render={({ field }) => (
                        <Select
                          allowClear
                          placeholder="Vui lòng chọn"
                          options={optionsFormGroup}
                          {...field}
                          onChangeCustom={() => {
                            getListFormOrder();
                          }}
                        />
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
                  <FormItem isRequired={false} label="Layout">
                    <Controller
                      name="layout"
                      control={control}
                      render={({ field }) => (
                        <Select
                          allowClear
                          placeholder="Vui lòng chọn"
                          options={listLayout}
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Số lượng cột">
                    <Controller
                      name="numOfColumn"
                      control={control}
                      render={({ field }) => (
                        <InputNumber
                          min={0}
                          disabled={watchLayout !== 'grid_view'}
                          placeholder="Vui lòng nhập"
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </Col>
                <Col>
                  <FormItem isRequired={false} label="Trạng thái">
                    <Toggle {...register('status')} />
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

export default CreateConfigForm;
