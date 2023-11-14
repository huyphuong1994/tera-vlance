import {
  DatePicker,
  Form,
  FormItem,
  Input,
  Modal,
  notification,
  Spin,
  TextArea,
} from 'tera-dls';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFileUpload, IFormInsurance } from '../../interfaces';
import useConfirm from '../../../../../../../_common/hooks/useConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  messageError,
  messageWarning,
} from '../../../../../../../_common/constants/message';
import { EquipmentInsuranceApi } from '../../_api';
import { useParams } from 'react-router-dom';
import UploadPdf from '../../../../../../../_common/component/UploadPdf';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  equipment_id: yup.number().required('Vui lòng nhập trường này!'),
  started_at: yup.string().required('Vui lòng nhập trường này!'),
  finished_at: yup.string().required('Vui lòng nhập trường này!'),
  address: yup.string().required('Vui lòng nhập trường này!'),
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

function FormInsurance(props: IProps) {
  const confirm = useConfirm();
  const { equipmentId } = useParams();
  const { open = false, id, onClose, onRefetch } = props;
  const [fileUpload, setFileUpload] = useState<IFileUpload[]>([]);

  const {
    register,
    control,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormInsurance>({
    resolver: yupResolver<IFormInsurance>(schema),
    mode: 'onChange',
    defaultValues: {
      equipment_id: +equipmentId,
      started_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      finished_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  });

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-equipment', id],
    () => EquipmentInsuranceApi.getEquipmentInsuranceDetail(id),
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
    (variable: IFormInsurance) => {
      if (fileUpload.length > 0) {
        variable.file_upload = fileUpload[0];
      }

      if (id)
        return EquipmentInsuranceApi.updateEquipmentInsurance(variable, id);
      return EquipmentInsuranceApi.createEquipmentInsurance(variable);
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

  const handleSubmitForm = (values: IFormInsurance): void => {
    if (loadingSubmit) return;
    submitForm(values);
  };

  useEffect(() => {
    setFileUpload([
      {
        name: detailColumn?.file_name,
        url: detailColumn?.file_url,
      },
    ]);
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
        title={id ? 'SỬA THÔNG TIN ĐĂNG KIỂM' : 'THÊM THÔNG TIN ĐĂNG KIỂM'}
        open={open}
        width={'90%'}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={() => handleSubmit(handleSubmitForm)()}
        onCancel={handleCloseConfirm}
        confirmLoading={(isLoading && !!id) || loadingSubmit}
      >
        <Spin spinning={isLoading && !!id}>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-6 gap-x-8">
              <div className="col-span-4">
                <UploadPdf
                  folder={'maneuver'}
                  object_key={'maneuver'}
                  onReceiveImages={(data) => {
                    if (data.length > 0) setFileUpload(data);
                  }}
                  fileList={fileUpload}
                />
              </div>
              <div className="col-span-2">
                <FormItem
                  className="mb-5"
                  label="Ngày bắt đầu"
                  isError={!!errors?.started_at}
                  messages={errors?.started_at?.message as string}
                >
                  <Controller
                    name="started_at"
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
                  label="Ngày kết thúc"
                  isError={!!errors?.finished_at}
                  messages={errors?.finished_at?.message as string}
                >
                  <Controller
                    name="finished_at"
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
                  label="Nơi đăng ký"
                  isError={!!errors?.address}
                  messages={errors?.address?.message as string}
                >
                  <Input
                    {...register('address')}
                    placeholder="Vui lòng nhập"
                    className="w-full"
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Ghi chú"
                  isError={!!errors?.note}
                  messages={errors?.note?.message as string}
                >
                  <TextArea
                    rows={22}
                    style={{ resize: 'none' }}
                    placeholder="Vui lòng nhập"
                    {...register('note')}
                  />
                </FormItem>
              </div>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default FormInsurance;
