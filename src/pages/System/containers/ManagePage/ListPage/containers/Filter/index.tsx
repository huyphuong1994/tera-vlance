import { yupResolver } from '@hookform/resolvers/yup';
import Filter from '_common/component/Filter';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem, Row, Select } from 'tera-dls';
import * as yup from 'yup';
import { IFilter } from '../../interfaces';
import { useQuery } from '@tanstack/react-query';
import ManagePageApi from '../../_api';
import { useMemo } from 'react';
import { optionsBusinessId, statusOnOffString } from '../../../constants';

const schema = yup.object().shape({
  parent_menu_id: yup.number().nullable(),
  status: yup.string().nullable(),
  business_id: yup.number().nullable(),
});

interface ManagePageFilterProps {
  open: boolean;
  onClose: () => void;
  onFilter: (value) => void;
  initialValue: any;
}

function ManagePageFilter({
  open,
  onClose,
  onFilter,
  initialValue,
}: ManagePageFilterProps) {
  const { handleSubmit, control } = useForm<IFilter>({
    resolver: yupResolver<IFilter>(schema),
    defaultValues: {
      parent_menu_id: initialValue?.parent_menu_id,
      status: initialValue?.status,
      business_id: +initialValue?.business_id,
    },
  });

  const { data: listParentMenu } = useQuery(
    ['get-parent-menus'],
    () => ManagePageApi.getParentMenuList(),
    {
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const handleSubmitForm = (value) => {
    onFilter(value);
    onClose();
  };

  const handleReset = () => {
    const values: IFilter = {
      parent_menu_id: null,
      status: null,
      business_id: null,
    };
    onFilter(values);
    onClose();
  };

  const optionsParentMenu = useMemo(() => {
    const options = listParentMenu?.data?.map((item) => ({
      label: item?.title,
      value: item?.id,
    }));
    return options || [];
  }, [listParentMenu]);

  const optionsStatus = Object.keys(statusOnOffString).map((key) => ({
    label: statusOnOffString[key]?.name,
    value: key,
  }));

  return (
    <Filter
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onFilter={() => handleSubmit(handleSubmitForm)()}
    >
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Row className="grid gap-y-0">
          <FormItem label="Menu cha" isRequired={false}>
            <Controller
              name="parent_menu_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Vui lòng chọn"
                  options={optionsParentMenu}
                  allowClear
                />
              )}
            />
          </FormItem>
          <FormItem label="Trạng thái" isRequired={false}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Vui lòng chọn"
                  options={optionsStatus}
                  allowClear
                />
              )}
            />
          </FormItem>
          <FormItem label="business_id" isRequired={false}>
            <Controller
              name="business_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsBusinessId}
                  placeholder="Vui lòng chọn"
                  allowClear
                />
              )}
            />
          </FormItem>
        </Row>
        <a
          className="text-red-500 text-sm font-normal cursor-pointer"
          onClick={() => handleReset()}
        >
          Hủy bộ lọc
        </a>
      </Form>
    </Filter>
  );
}

export default ManagePageFilter;
