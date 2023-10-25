import { Form, FormItem, Input, Modal, notification, Spin } from 'tera-dls';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGEX } from '../../../../../_common/constants/common';
import {
  messageError,
  messageWarning,
} from '../../../../../_common/constants/message';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IFormCategory } from '../../interfaces';
import CategoryPageApi from '../../../Category/_api';

interface IProps {
  id?: string | number;
  open: boolean;
  onClose: () => void;
  onRefetch: () => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự!'),
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự!')
    .matches(REGEX.CODE, 'Mã thiết bị không dấu và chỉ chứa kí tự "_"'),
});

const CategoryForm = (props: IProps) => {
  const { open = false, id, onClose, onRefetch } = props;
  const {
    register,
    reset,
    setValue,
    // watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormCategory>({
    resolver: yupResolver<IFormCategory>(schema),
    mode: 'onChange',
  });

  const confirm = useConfirm();

  const {
    data: detailColumn,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['get-detail-column-category', id],
    () => CategoryPageApi.getDetailCategory(id),
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
    (variable: IFormCategory) => {
      return CategoryPageApi.createCategory(variable);
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

  const handleSubmitForm = (values: IFormCategory): void => {
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
    <Modal
      centered={true}
      title={id ? 'SỬA NHÓM THIẾT BỊ' : 'THÊM NHÓM THIẾT BỊ'}
      open={open}
      width={700}
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
          className="grid grid-cols-1 gap-x-8"
        >
          <div>
            <FormItem
              className="mb-5"
              label="Mã nhóm thiết bị"
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
              label="Tên nhóm thiết bị"
              isError={!!errors?.title}
              messages={errors?.title?.message as string}
            >
              <Input
                {...register('title')}
                placeholder="Vui lòng nhập"
                className="w-full"
              />
            </FormItem>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CategoryForm;
