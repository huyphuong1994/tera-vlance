import {
  // DatePicker,
  Form,
  FormItem,
  // Input,
  Modal,
  notification,
  Spin,
  TextArea,
} from 'tera-dls';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFileUpload, IFormRecord } from '../../interfaces';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  messageError,
  messageWarning,
} from '../../../../../../../_common/constants/message';
import { EquipmentRecordApi } from '../../_api';
import { useParams } from 'react-router-dom';
import UploadFiles from '../../../../../../../_common/component/UploadFiles';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  equipment_id: yup.number().required('Vui lòng nhập trường này!'),
  status: yup.number().required('Vui lòng nhập trường này!'),
  note: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .max(500, 'Không nhập quá 191 ký tự!'),
  file_upload: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
    url: yup.string(),
  }),
});

function FormRecord(props: IProps) {
  const confirm = useConfirm();
  const { equipmentId } = useParams();
  const { open = false, id, onClose, onRefetch } = props;
  const [fileUpload, setFileUpload] = useState<IFileUpload>();
  const {
    register,
    // control,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormRecord>({
    resolver: yupResolver<IFormRecord>(schema),
    mode: 'onChange',
    defaultValues: {
      equipment_id: +equipmentId,
      status: 1,
    },
  });

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-registry', id],
    () => EquipmentRecordApi.getEquipmentRecordDetail(id),
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
    (variable: IFormRecord) => {
      if (fileUpload.url) {
        variable.file_upload = fileUpload;
      }

      if (id) return EquipmentRecordApi.updateEquipmentRecord(variable, id);
      return EquipmentRecordApi.createEquipmentRecord(variable);
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

  const handleSubmitForm = (values: IFormRecord): void => {
    if (loadingSubmit) return;
    submitForm(values);
  };

  useEffect(() => {
    setFileUpload({
      name: detailColumn?.file_name,
      url: detailColumn?.file_url,
    });
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
        title={id ? 'SỬA HỒ SƠ SỮA CHỮA' : 'THÊM HỒ SƠ SỮA CHỮA'}
        open={open}
        width={'400px'}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={() => handleSubmit(handleSubmitForm)()}
        onCancel={handleCloseConfirm}
        confirmLoading={(isLoading && !!id) || loadingSubmit}
      >
        <Spin spinning={isLoading && !!id}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid gap-8">
              <UploadFiles
                folder={'record'}
                object_key={'maneuver'}
                onReceiveFiles={(data) => {
                  console.log('123', data);
                  if (data.url) setFileUpload(data);
                }}
                fileList={[fileUpload]}
              />
              <FormItem
                isRequired={false}
                className="mb-5"
                label="Ghi chú"
                isError={!!errors?.note}
                messages={errors?.note?.message as string}
              >
                <TextArea
                  rows={6}
                  style={{ resize: 'none' }}
                  placeholder="Vui lòng nhập"
                  {...register('note')}
                />
              </FormItem>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default FormRecord;
