import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  Input,
  Modal,
  Select,
  Toggle,
  ValueType,
  notification,
} from 'tera-dls';
import * as yup from 'yup';
import { LAYOUT } from '../../constants';
import useConfirm from '_common/hooks/useConfirm';
import { messageError, messageWarning } from '_common/constants/message';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import SystemTableConfigApi from '../../_api';
import SelectTableConfig from '_common/dof/Select/SelectTableConfig';
import { defaultStandingFirstOption } from '../../../constants';
import { useState } from 'react';
import _ from 'lodash';
import { trimData } from '_common/utils';
import { REGEX } from '_common/constants/common';

interface IProps {
  open: boolean;
  id?: number;
  pageId: number;
  onClose: () => void;
  onChangeSuccess?: () => void;
}

interface IForm {
  code: string;
  name: string;
  group: string;
  layout: string;
  stand_behind: number;
  class_name: string;
  status: boolean;
}
const schema = yup.object().shape({
  code: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(191, 'Không nhập quá 191 ký tự!')
    .matches(REGEX.CODE, "Mã bảng không dấu và chỉ chứa kí tự '_'"),
  name: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .trim()
    .max(255, 'Không nhập quá 255 ký tự!'),
  group: yup.string().required('Vui lòng chọn trường này!'),
  layout: yup.string().nullable(),
  stand_behind: yup.number().nullable(),
  class_name: yup.string().nullable().max(255, 'Không nhập quá 255 ký tự!'),
  status: yup.boolean().nullable(),
});

const TableConfigForm = (props: IProps) => {
  const { open = false, id, onClose, pageId, onChangeSuccess } = props;
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
  const [groupKey, setGroupKey] = useState<string>();
  const [standTable, setStandTable] = useState<ValueType>();
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

  const updateDetail = (data) => {
    const values = _.pick(data, ['code', 'name', 'layout', 'class_name']);
    reset({
      ...values,
      status: data?.status === 'active' ? true : false,
      group: data?.group?.key,
    });
    setGroupKey(data?.group?.key);

    if (data?.standing_behind === 0) {
      setStandTable(defaultStandingFirstOption);
      setValue('stand_behind', 0);
    } else {
      setValue('stand_behind', data?.standing_behind?.id);
      setStandTable({
        value: data?.standing_behind?.id,
        label: data?.standing_behind?.name,
      });
    }
  };

  const [{ data: groupTables }] = useQueries({
    queries: [
      {
        queryKey: ['get-group-table'],
        queryFn: () => SystemTableConfigApi.getGroupList({}),
        enabled: open,
        staleTime: 300000,
        cacheTime: 300000,
      },
      {
        queryKey: ['get-table-detail', id],
        queryFn: () => SystemTableConfigApi.getDetail({ id }),
        enabled: !!id && open,
        onSuccess: (data) => {
          updateDetail(data);
        },
      },
    ],
  });

  const cleanCacheDof = () => {
    queryClient.removeQueries({ queryKey: ['get-table-config-by-page-id'] });
  };

  const { mutate: mutateForm } = useMutation(
    (variables: any) => {
      return id
        ? SystemTableConfigApi.update({ id, params: variables })
        : SystemTableConfigApi.create(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          onChangeSuccess && onChangeSuccess();
          cleanCacheDof();
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
    mutateForm({
      ...values,
      code: trimData(values.code),
      page_id: pageId,
      status: values?.status ? 'active' : 'inactive',
    });
  };

  const groupTableOptions = groupTables?.map((item) => ({
    value: item.key,
    label: item.title,
  }));

  return (
    <Modal
      centered={true}
      title={id ? 'SỬA BẢNG DỮ LIỆU' : 'THÊM BẢNG DỮ LIỆU'}
      open={open}
      className=" xxs:w-[95%] md:w-[418px]"
      closeIcon={false}
      okText="Lưu"
      cancelText="Huỷ"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={handleCloseConfirm}
      destroyOnClose={true}
    >
      <Form className="h-full">
        <FormItem
          label="Mã bảng dữ liệu"
          isError={!!errors?.code}
          messages={errors?.code?.message as string}
          help={
            <span className="text-gray-400 text-[0.625rem] italic">
              Nhập thông tin <span className="text-gray-800">[table]</span>, hệ
              thống sẽ tự gán theo Format:{' '}
              <span className="text-gray-800">[module]_[page]_[table]</span>{' '}
            </span>
          }
        >
          <Input
            {...register('code')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
        </FormItem>
        <FormItem
          label="Tiêu đề"
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
          label="Nhóm bảng dữ liệu"
          isError={!!errors?.group}
          messages={errors?.group?.message as string}
        >
          <Controller
            name="group"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  placeholder="Vui lòng chọn"
                  showSearch
                  value={groupKey}
                  onSelect={(value) => {
                    setGroupKey(value as string);
                    setValue('stand_behind', null);
                    setStandTable(null);
                  }}
                  options={groupTableOptions}
                  {...field}
                />
              );
            }}
          />
        </FormItem>

        <FormItem label="Layout" isRequired={false}>
          <Controller
            name="layout"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Vui lòng chọn"
                onSelect={(value) => value}
                showSearch
                options={Object.keys(LAYOUT).map((key) => ({
                  value: key,
                  label: LAYOUT[key],
                }))}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem label="Thứ tự đứng sau" isRequired={false}>
          <Controller
            name="stand_behind"
            control={control}
            render={({ field }) => (
              <SelectTableConfig
                pageId={pageId}
                groupKey={groupKey}
                disabled={!watch('group')}
                selectedValue={standTable}
                onSelect={(val: ValueType) => {
                  setStandTable(val);
                }}
                defaultOptions={[defaultStandingFirstOption]}
                paramsApi={{
                  table_id: id,
                  limit: 50,
                }}
                onClear={() => setStandTable({})}
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="className"
          isRequired={false}
          isError={!!errors?.class_name}
          messages={errors?.class_name?.message as string}
        >
          <Input
            {...register('class_name')}
            placeholder="Vui lòng nhập"
            className="w-full"
          />
        </FormItem>
        <FormItem label="Trạng thái" isRequired={false}>
          <Toggle {...register('status')} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default TableConfigForm;
