import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';

import SelectPageConfig from '_common/dof/Select/SelectPageConfig';
import useConfirm from '_common/hooks/useConfirm';
import _ from 'lodash';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  Input,
  Modal,
  OptionProps,
  Select,
  Toggle,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import {
  defaultStandingFirstOption,
  optionsBusinessId,
} from '../../../constants';
import ManagePageApi from '../../_api';
import SelectIcon from '_common/dof/Select/SelectIcon';
import { REGEX } from '_common/constants/common';

interface IProps {
  open: boolean;
  id?: number;
  onClose: () => void;
  onChangeDataSuccess?: () => void;
}

interface IForm {
  code: string;
  name: string;
  title: string;
  parent_menu_id: number;
  path: string;
  icon: string;
  stand_behind: number;
  business_id: number;
  status: boolean;
}
const schema = yup.object().shape({
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự!')
    .matches(REGEX.CODE, "Mã trang không dấu và chỉ chứa kí tự '_'"),
  name: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự!'),
  title: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự!'),
  parent_menu_id: yup.number().required('Vui lòng chọn trường này!'),
  path: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự!'),
  icon: yup.string().nullable(),
  stand_behind: yup.number().nullable(),
  business_id: yup.number().nullable(),
  status: yup.boolean().default(false),
});

const ManagePageForm = (props: IProps) => {
  const { open = false, id, onClose, onChangeDataSuccess } = props;
  const [standPage, setStandPage] = useState<OptionProps>();
  const [parentMenuId, setParentMenuId] = useState<number | undefined>();

  const {
    register,
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IForm>({
    resolver: yupResolver<IForm>(schema),
    mode: 'onChange',
  });
  const confirm = useConfirm();

  const queryClient = useQueryClient();

  const handleClose = (): void => {
    reset();
    onClose();
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

  const updateData = (data) => {
    const values = _.pick(data, [
      'code',
      'name',
      'title',
      'path',
      'icon',
      'parent_menu_id',
      'business_id',
    ]);
    reset({
      ...values,
      status: data?.status === 'active' ? true : false,
    });

    setParentMenuId(data?.parent_menu_id);
    if (data?.standing_behind === 0) {
      setStandPage(defaultStandingFirstOption);
      setValue('stand_behind', 0);
    } else {
      setValue('stand_behind', data?.standing_behind?.id);
      setStandPage({
        value: data?.standing_behind?.id,
        label: data?.standing_behind?.name,
      });
    }
  };

  const [{ data: parentMenus }] = useQueries({
    queries: [
      {
        queryKey: ['get-parent-menus'],
        queryFn: () => ManagePageApi.getParentMenuList({}),
        enabled: !!open,
        cacheTime: 300000,
        staleTime: 300000,
      },
      {
        queryKey: ['get-page-detail', id],
        queryFn: () => ManagePageApi.getDetail(id),
        enabled: !!open && !!id,
        onSuccess: (data) => {
          updateData(data);
        },
      },
    ],
  });

  const { mutate: mutateForm } = useMutation(
    (variables: any) => {
      return id
        ? ManagePageApi.update(id, variables)
        : ManagePageApi.create(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          onChangeDataSuccess && onChangeDataSuccess();
          queryClient.removeQueries({
            queryKey: ['get-page-by-menu-id'],
          });
          onClose();
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

  const trimData = (code: string): string => {
    return code.split(' ').join('');
  };

  const handleSubmitForm = (values: { [key: string]: any }): void => {
    const code = trimData(values.code);
    mutateForm({
      ...values,
      code,
      status: values?.status ? 'active' : 'inactive',
    });
  };

  const parentMenuOptions = parentMenus?.data?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <Modal
      centered={true}
      title={id ? ' SỬA TRANG' : 'THÊM TRANG'}
      open={open}
      width={500}
      closeIcon={false}
      okText="Lưu"
      cancelText="Huỷ"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={handleCloseConfirm}
      destroyOnClose={true}
    >
      <Form className="h-full">
        <FormItem
          label="Mã trang"
          isError={!!errors?.code}
          messages={errors?.code?.message as string}
        >
          <Input
            {...register('code')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
          <p className="text-gray-400 text-[0.625rem] italic mt-1">
            Nhập thông tin <span className="text-gray-800">[page]</span>, hệ
            thống sẽ tự gán theo Format:
            <span className="text-gray-800">[module]_[page]</span>{' '}
          </p>
        </FormItem>
        <FormItem
          label="Tên trang"
          isError={!!errors?.name}
          messages={errors?.name?.message as string}
        >
          <Input
            {...register('name')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
        </FormItem>
        <FormItem
          label="Tiêu đề"
          isError={!!errors?.title}
          messages={errors?.title?.message as string}
        >
          <Input
            {...register('title')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
        </FormItem>

        <FormItem
          label="Menu cha"
          isError={!!errors?.parent_menu_id}
          messages={errors?.parent_menu_id?.message as string}
        >
          <Controller
            name="parent_menu_id"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  placeholder="Vui lòng chọn"
                  showSearch
                  value={parentMenuId}
                  onSelect={(value) => {
                    setParentMenuId(value as number);
                    setValue('stand_behind', null);
                    setStandPage(null);
                  }}
                  options={parentMenuOptions ?? []}
                  {...field}
                />
              );
            }}
          />
        </FormItem>

        <FormItem
          label="Đường dẫn"
          isRequired={false}
          isError={!!errors?.path}
          messages={errors?.path?.message as string}
        >
          <Input
            {...register('path')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
        </FormItem>
        <FormItem label="Icon" isRequired={false}>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <SelectIcon placeholder="Vui lòng chọn" {...field} />
            )}
          />
        </FormItem>
        <FormItem label="Thứ tự đứng sau" isRequired={false}>
          <Controller
            name="stand_behind"
            control={control}
            render={({ field }) => (
              <SelectPageConfig
                disabled={!watch('parent_menu_id')}
                parentMenuId={parentMenuId}
                defaultOptions={[defaultStandingFirstOption]}
                selectedValue={standPage}
                onSelect={(val: OptionProps) => {
                  setStandPage(val);
                }}
                paramsApi={{
                  page_id: id,
                  limit: 50,
                }}
                onClear={() => setStandPage({})}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem label="Business_id" isRequired={false}>
          <Controller
            name="business_id"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Vui lòng chọn"
                showSearch
                allowClear
                options={optionsBusinessId}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem label="Trạng thái" isRequired={false}>
          <Toggle {...register('status')} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ManagePageForm;
