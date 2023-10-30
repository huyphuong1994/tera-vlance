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
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useConfirm from '../../../../_common/hooks/useConfirm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  messageError,
  messageWarning,
} from '../../../../_common/constants/message';
import ManeuverPageApi from '../../Maneuver/_api';
import { HrmApi } from '../../../../_common/dof/_api';
// import { useParams } from 'react-router-dom';
import UploadPdf from '../../../../_common/component/UploadPdf';
import SelectFieldConfig from '../../../../_common/dof/Select/SelectFieldConfig';
import { IFormManeuverItem } from '../../Maneuver/interfaces';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  project_id: yup.number().required('Vui lòng nhập trường này!'),
  equipment_id: yup.array().required('Vui lòng nhập trường này!'),
  file_upload: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
    url: yup.string(),
  }),
  determine_number: yup.string().required('Vui lòng nhập trường này!'),
  started_at: yup.string(),
  assigned_at: yup.string(),
  note: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .max(500, 'Không nhập quá 500 ký tự!'),
});

function FormManeuver(props: IProps) {
  const confirm = useConfirm();
  // const { equipmentId } = useParams();
  const { open = false, id, onClose, onRefetch } = props;
  const {
    register,
    control,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormManeuverItem>({
    resolver: yupResolver<IFormManeuverItem>(schema),
    mode: 'onChange',
  });

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-equipment-maneuver', id],
    () => ManeuverPageApi.getManeuverDetail(id),
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
    (variable: IFormManeuverItem) => {
      if (id) return ManeuverPageApi.updateManeuver(variable, id);
      return ManeuverPageApi.createManeuver(variable);
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

  const handleSubmitForm = (values: IFormManeuverItem): void => {
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
        title={id ? 'SỬA ĐIỀU ĐỘNG THIẾT BỊ' : 'THÊM ĐIỀU ĐỘNG THIẾT BỊ'}
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
                  onReceiveImages={(data) => {
                    console.log('123', data);
                  }}
                  object_key={'maneuver'}
                  folder={'equipment-maneuver'}
                />
              </div>
              <div className="col-span-2">
                <FormItem
                  className="mb-5"
                  label="Chuyển đến dự án"
                  isError={!!errors?.project_id}
                  messages={errors?.project_id?.message as string}
                >
                  <Controller
                    name="project_id"
                    control={control}
                    render={() => {
                      return <SelectFieldConfig></SelectFieldConfig>;
                    }}
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Số quyết định"
                  isError={!!errors?.determine_number}
                  messages={errors?.determine_number?.message as string}
                >
                  <Input
                    {...register('determine_number')}
                    placeholder="Vui lòng nhập"
                    className="w-full"
                  />
                </FormItem>
                <FormItem
                  isRequired={false}
                  className="mb-5"
                  label="Ngày chuyển đi"
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
                  isRequired={false}
                  className="mb-5"
                  label="Ngày chuyển đến"
                  isError={!!errors?.assigned_at}
                  messages={errors?.assigned_at?.message as string}
                >
                  <Controller
                    name="assigned_at"
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

export default FormManeuver;
