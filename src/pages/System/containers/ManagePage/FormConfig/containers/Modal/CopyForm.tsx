import { yupResolver } from '@hookform/resolvers/yup';
import useConfirm from '_common/hooks/useConfirm';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageError } from '_common/constants/message';
import SelectFieldConfig from '_common/dof/Select/SelectFieldConfig';
import SelectFormConfig from '_common/dof/Select/SelectFormConfig';
import SelectPageConfig from '_common/dof/Select/SelectPageConfig';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  Col,
  Form,
  FormItem,
  Modal,
  OptionProps,
  Row,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import FormConfigApi from '../../_api';

interface IDetailEmployeeGroup {
  isOpen?: boolean;
  handleClose?: () => void;
}
interface IForm {
  page: string;
  form: any[];
  field: any[];
}

const schema = yup.object().shape({
  page: yup.string().required('Vui lòng nhập trường này!'),
  form: yup.array().required('Vui lòng nhập trường này!'),
  field: yup.array().nullable(),
});

const CopyForm = ({ isOpen, handleClose }: IDetailEmployeeGroup) => {
  const defaultValues = {
    page: '',
    form: [],
    field: [],
  };
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { pageId } = useParams();
  const [pageSelected, setPageSelected] = useState<OptionProps>();
  const [formSelected, setFormSelected] = useState<OptionProps[]>([]);
  const [fieldSelected, setFieldSelected] = useState<OptionProps[]>([]);
  const [paramsListForm, setParamsListForm] = useState({});
  const [paramsListField, setParamsListField] = useState({});

  const {
    reset,
    handleSubmit,
    setValue,
    // getValues,
    formState: { errors, isDirty },
    control,
    watch,
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<any>(schema),
    defaultValues,
  });

  const watchPage = watch('page');
  const watchForm = watch('form');

  const handleResetForm = () => {
    reset();
  };

  const handleCancel = () => {
    handleClose();
    handleResetForm();
    queryClient.setQueryData(['employee_detail_leave'], null);
  };

  const { mutate: handleMutation, isLoading } = useMutation(
    (variables: any) => {
      return FormConfigApi.cloneData(variables);
    },
    {
      onSuccess: (res) => {
        if (res.code === 200) {
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

  const handleClearPage = () => {
    setFormSelected([]);
    setValue('form', []);
  };

  const handleSubmitForm = (valueForm: IForm) => {
    const convertData = {
      page_id: Number(pageId), // Trang Cần Được Thêm Data
      page_target_id: Number(valueForm?.page), // Trang chứa data để lấy
      form_selected: valueForm?.form.includes('all') ? 'all' : valueForm?.form,
      field_selected: valueForm?.field.includes('all')
        ? 'all'
        : valueForm?.field,
    };
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

  return (
    <>
      <Modal
        centered={true}
        title={'Sao chép cấu hình form dữ liệu'}
        open={isOpen}
        onCancel={onExitModal}
        onOk={handleSubmit(handleSubmitForm)}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        className="sm:w-[50%] md:w-[50%] lg:w-[25%]"
        confirmLoading={isLoading}
        destroyOnClose
      >
        <Form
          className="overflow-auto h-full"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <Row className="gap-x-10">
            <Col>
              <FormItem
                isError={!!errors.page}
                messages={errors?.page?.message}
                label="Chọn trang nguồn"
              >
                <Controller
                  name="page"
                  control={control}
                  render={({ field }) => (
                    <SelectPageConfig
                      paramsApi={{ page_id: pageId }}
                      onClear={handleClearPage}
                      selectedValue={pageSelected}
                      onSelect={(value: OptionProps) => {
                        setPageSelected(value);
                        setParamsListForm({ page_id: Number(value?.value) });
                        handleClearPage();
                      }}
                      {...field}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col>
              <FormItem
                isError={!!errors.form}
                messages={errors?.form?.message}
                label="Chọn cấu hình form"
              >
                <Controller
                  name="form"
                  control={control}
                  render={({ field }) => (
                    <SelectFormConfig
                      mode="multiple"
                      isCheckAll
                      selectedValue={formSelected}
                      onClear={() => setFormSelected([])}
                      disabled={!watchPage}
                      paramsApi={paramsListForm}
                      onSelect={(selected: OptionProps[]) => {
                        setFormSelected(selected);
                        const listId = selected.map((select) => select.value);
                        const checkParam = listId.includes('all')
                          ? {
                              form_ids: 'all',
                              page_id: watchPage,
                            }
                          : {
                              form_ids: String(listId),
                              page_id: watchPage,
                            };
                        setParamsListField(checkParam);
                      }}
                      {...field}
                    />
                  )}
                />
              </FormItem>
            </Col>
            <Col>
              <FormItem isRequired={false} label="Chọn cấu hình trường dữ liệu">
                <Controller
                  name="field"
                  control={control}
                  render={({ field }) => (
                    <SelectFieldConfig
                      mode="multiple"
                      isCheckAll
                      selectedValue={fieldSelected}
                      onClear={() => setFieldSelected([])}
                      disabled={!watchForm.length}
                      paramsApi={paramsListField}
                      onSelect={(selected: OptionProps[]) => {
                        console.log('selected', selected);
                        setFieldSelected(selected);
                      }}
                      {...field}
                    />
                  )}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CopyForm;
