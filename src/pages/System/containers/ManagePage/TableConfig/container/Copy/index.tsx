import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem, Modal, OptionProps, notification } from 'tera-dls';
import * as yup from 'yup';
import useConfirm from '_common/hooks/useConfirm';
import { messageError, messageWarning } from '_common/constants/message';
import SelectPageConfig from '_common/dof/Select/SelectPageConfig';
import SelectTableConfig from '_common/dof/Select/SelectTableConfig';
import { useMutation } from '@tanstack/react-query';
import SystemTableConfigApi from '../../_api';
import SelectColumnConfig from '_common/dof/Select/SelectColumnConfig';
import { useState } from 'react';
import { getFieldObjToArr } from '_common/utils';

interface IProps {
  open: boolean;
  pageId?: number;
  onClose: () => void;
  onCopySuccess?: () => void;
}

interface IForm {
  page_root_id: number;
  config_tables: number[] | string[];
  config_columns: number[] | string[];
}

const schema = yup.object().shape({
  page_root_id: yup.number().required('Vui lòng chọn trường này!'),
  config_tables: yup.array().required('Vui lòng chọn trường này!'),
  config_columns: yup.array().nullable(),
});

const TableConfigCopy = (props: IProps) => {
  const { open = false, pageId, onClose, onCopySuccess } = props;
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    resolver: yupResolver<IForm>(schema),
  });
  const [selectedTable, setSelectedTable] = useState<OptionProps[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<OptionProps[]>([]);

  const confirm = useConfirm();

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const resetField = (type: 'page' | 'table') => {
    switch (type) {
      case 'table': {
        setSelectedColumn([]);
        break;
      }
      case 'page': {
        setSelectedColumn([]);
        setSelectedTable([]);
        break;
      }
    }
  };

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
        className: 'modal-button-center',
        onOk: () => {
          handleClose();
        },
      });
    } else {
      handleClose();
    }
  };

  const mutateCopy = useMutation(
    (variables: any) => {
      return SystemTableConfigApi.clone({ params: variables });
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          onCopySuccess && onCopySuccess();
          handleClose();
          notification.success({
            message: msg,
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

  const handleSubmitForm = (values: { [key: string]: any }): void => {
    mutateCopy.mutate({ ...values, page_current_id: pageId });
  };

  return (
    <Modal
      centered={true}
      title="SAO CHÉP BẢNG DỮ LIỆU"
      open={open}
      className="xxs:w-[95%] md:w-[418px]"
      closeIcon={false}
      okText="Lưu"
      cancelText="Huỷ"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={handleCloseConfirm}
      destroyOnClose={true}
    >
      <Form className="h-full">
        <FormItem
          label="Chọn trang nguồn"
          isError={!!errors?.page_root_id}
          messages={errors?.page_root_id?.message as string}
        >
          <Controller
            name="page_root_id"
            control={control}
            render={({ field }) => (
              <SelectPageConfig
                onSelect={() => {
                  resetField('page');
                }}
                paramsApi={{
                  page_id: pageId,
                  limit: 50,
                }}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Chọn cấu hình bảng dữ liệu"
          isError={!!errors?.config_tables}
          messages={errors?.config_tables?.message as string}
        >
          <Controller
            name="config_tables"
            control={control}
            render={({ field }) => {
              return (
                <SelectTableConfig
                  mode="multiple"
                  isCheckAll
                  selectedValue={selectedTable}
                  disabled={!watch('page_root_id')}
                  onClear={() => setSelectedTable([])}
                  pageId={watch('page_root_id')}
                  onSelect={(value: OptionProps[]) => {
                    setSelectedTable(value);
                    resetField('table');
                  }}
                  paramsApi={{
                    limit: 50,
                  }}
                  {...field}
                />
              );
            }}
          />
        </FormItem>
        <FormItem label="Chọn cấu hình cột dữ liệu" isRequired={false}>
          <Controller
            name="config_columns"
            control={control}
            render={({ field }) => {
              return (
                <SelectColumnConfig
                  {...field}
                  disabled={!selectedTable.length}
                  mode="multiple"
                  selectedValue={selectedColumn}
                  onSelect={(value: OptionProps[]) => {
                    setSelectedColumn(value);
                  }}
                  paramsApi={{
                    table_id: getFieldObjToArr(selectedTable, 'value'),
                    page_id: watch('page_root_id'),
                    limit: 50,
                  }}
                  isCheckAll
                  onClear={() => setSelectedColumn([])}
                  typeLabel="table-column"
                />
              );
            }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default TableConfigCopy;
