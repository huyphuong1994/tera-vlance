import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';
import SelectColumnConfig from '_common/dof/Select/SelectColumnConfig';
import SelectControlConfig from '_common/dof/Select/SelectControlConfig';
import SelectFieldConfig from '_common/dof/Select/SelectFieldConfig';
import SelectFormConfig from '_common/dof/Select/SelectFormConfig';
import SelectPageConfig from '_common/dof/Select/SelectPageConfig';
import SelectTableConfig from '_common/dof/Select/SelectTableConfig';
import useConfirm from '_common/hooks/useConfirm';
import { getFieldObjToArr } from '_common/utils';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem, Modal, OptionProps, notification } from 'tera-dls';
import * as yup from 'yup';
import ManagePageApi from '../../_api';
import { IFormCopy } from '../../interfaces';

interface ManagePageCopyProps {
  pageId: string | number;
  open: boolean;
  onClose: () => void;
}

const schema = yup.object().shape({
  page_root_id: yup.string().required('Vui lòng chọn trường này'),
  page_current_id: yup.string().nullable(),
  config_controls: yup.array().nullable(),
  config_tables: yup.array().nullable(),
  config_columns: yup.array().nullable(),
  config_forms: yup.array().nullable(),
  config_fields: yup.array().nullable(),
});

function ManagePageCopy({ open, onClose, pageId }: ManagePageCopyProps) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [selectedPage, setSelectedPage] = useState<OptionProps>(null);
  const [selectedForm, setSelectedForm] = useState<OptionProps[]>([]);
  const [selectedTable, setSelectedTable] = useState<OptionProps[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<OptionProps[]>([]);
  const [selectedControl, setSelectedControl] = useState<OptionProps[]>([]);
  const [selectedField, setSelectedField] = useState<OptionProps[]>([]);

  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty, isSubmitted, isValid },
  } = useForm<IFormCopy>({
    resolver: yupResolver<IFormCopy>(schema),
  });

  const isErrorMinimumConfig = useMemo(() => {
    const arrConfig = [
      selectedTable.length,
      selectedControl.length,
      selectedForm.length,
    ];
    const isError = arrConfig.some((item) => item > 0);
    return !isError;
  }, [selectedTable, selectedControl, selectedForm]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const { mutate: submitCopy } = useMutation(
    (variable: IFormCopy) => ManagePageApi.copy(variable),
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          handleClose();
          notification.success({
            message: msg,
          });

          if (selectedForm) queryClient.invalidateQueries(['list-form-config']);
          if (selectedTable)
            queryClient.invalidateQueries(['get-table-config-list']);
          if (selectedColumn)
            queryClient.invalidateQueries(['get-list-column-config']);
          if (selectedControl)
            queryClient.invalidateQueries(['get-list-control-config']);
          if (selectedField)
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

  const handleCloseConfirm = () => {
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

  const handleSubmitForm = () => {
    if (isErrorMinimumConfig) return;
    const dataCopy: IFormCopy = {
      page_root_id: selectedPage.value,
      page_current_id: pageId,
      config_controls: getFieldObjToArr(selectedControl, 'value'),
      config_tables: getFieldObjToArr(selectedTable, 'value'),
      config_columns: getFieldObjToArr(selectedColumn, 'value'),
      config_forms: getFieldObjToArr(selectedForm, 'value'),
      config_fields: getFieldObjToArr(selectedField, 'value'),
    };
    submitCopy(dataCopy);
  };

  const resetField = (type: 'page' | 'table' | 'form') => {
    switch (type) {
      case 'table': {
        setSelectedColumn([]);
        break;
      }
      case 'page': {
        setSelectedColumn([]);
        setSelectedForm([]);
        setSelectedTable([]);
        setSelectedControl([]);
        setSelectedField([]);
        break;
      }
      case 'form': {
        setSelectedField([]);
        break;
      }
    }
  };

  return (
    <Modal
      centered
      closeIcon={false}
      open={open}
      okText="Lưu"
      cancelText="Hủy"
      title="SAO CHÉP TRANG"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={handleCloseConfirm}
      className="md:w-[418px] w-[418px]"
    >
      <Form onSubmit={handleSubmit(handleSubmitForm)} className="h-full">
        <FormItem
          label="Chọn trang nguồn"
          isError={!!errors?.page_root_id}
          messages={errors?.page_root_id?.message}
        >
          <Controller
            name="page_root_id"
            control={control}
            render={({ field }) => (
              <SelectPageConfig
                {...field}
                placeholder="Vui lòng chọn"
                selectedValue={selectedPage}
                onSelect={(option: OptionProps) => {
                  setSelectedPage(option);
                  resetField('page');
                  reset({ page_root_id: option?.value }, { keepValues: true });
                }}
                onClear={() => setSelectedPage(null)}
                paramsApi={{ page_id: pageId }}
              />
            )}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình control" isRequired={false}>
          <Controller
            name="config_controls"
            control={control}
            render={({ field }) => (
              <SelectControlConfig
                {...field}
                isCheckAll
                mode="multiple"
                selectedValue={selectedControl}
                disabled={!watch('page_root_id')}
                onClear={() => setSelectedControl([])}
                onSelect={(value: OptionProps[]) => {
                  setSelectedControl(value);
                }}
                paramsApi={{ page_id: watch('page_root_id') }}
              />
            )}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình bảng dữ liệu" isRequired={false}>
          <Controller
            name="config_tables"
            control={control}
            render={({ field }) => (
              <SelectTableConfig
                {...field}
                isCheckAll
                mode="multiple"
                selectedValue={selectedTable}
                disabled={!watch('page_root_id')}
                pageId={watch('page_root_id')}
                placeholder="Vui lòng chọn"
                onClear={() => {
                  setSelectedTable([]);
                  resetField('table');
                }}
                onSelect={(value: OptionProps[]) => {
                  setSelectedTable(value);
                  resetField('table');
                }}
              />
            )}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình cột dữ liệu" isRequired={false}>
          <Controller
            name="config_columns"
            control={control}
            render={({ field }) => (
              <SelectColumnConfig
                {...field}
                isCheckAll
                mode="multiple"
                typeLabel="table-column"
                disabled={!selectedTable.length}
                selectedValue={selectedColumn}
                paramsApi={{
                  table_id: getFieldObjToArr(selectedTable, 'value'),
                  page_id: watch('page_root_id'),
                }}
                onClear={() => setSelectedColumn([])}
                onSelect={(value: OptionProps[]) => {
                  setSelectedColumn(value);
                }}
              />
            )}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình form" isRequired={false}>
          <Controller
            name="config_forms"
            control={control}
            render={({ field }) => (
              <SelectFormConfig
                {...field}
                mode="multiple"
                disabled={!watch('page_root_id')}
                selectedValue={selectedForm}
                isCheckAll
                onSelect={(value: OptionProps[]) => {
                  setSelectedForm(value);
                  resetField('form');
                }}
                onClear={() => {
                  setSelectedForm([]);
                  resetField('form');
                }}
                paramsApi={{ page_id: watch('page_root_id') }}
              />
            )}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình trường dữ liệu" isRequired={false}>
          <Controller
            name="config_fields"
            control={control}
            render={({ field }) => (
              <SelectFieldConfig
                {...field}
                disabled={!selectedForm.length}
                mode="multiple"
                typeLabel="form-field"
                selectedValue={selectedField}
                onSelect={(value: OptionProps[]) => {
                  setSelectedField(value);
                }}
                isCheckAll
                onClear={() => setSelectedField([])}
                paramsApi={{
                  form_ids: getFieldObjToArr(selectedForm, 'value'),
                  page_id: watch('page_root_id'),
                }}
              />
            )}
          />
        </FormItem>
        {isErrorMinimumConfig && isSubmitted && isValid && (
          <span className="text-red-500">
            * Vui lòng chọn ít nhất 1 cấu hình
          </span>
        )}
      </Form>
    </Modal>
  );
}

export default ManagePageCopy;
