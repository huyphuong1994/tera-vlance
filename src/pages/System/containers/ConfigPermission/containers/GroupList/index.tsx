import { useQueries } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import { IPagination } from '_common/interface';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ColumnsType,
  Form,
  FormItem,
  MagnifyingGlassOutlined,
  Modal,
  PaginationProps,
  Search,
  Select,
  Table,
} from 'tera-dls';
import GroupKeyApi from '../../_api/group-key';
import { QuerySearch } from '../../interfaces';

interface GroupListProps {
  open: boolean;
  onClose: () => void;
}
const GroupList = ({ open, onClose }: GroupListProps) => {
  const { register, handleSubmit, control, setValue } = useForm<QuerySearch>({
    mode: 'onChange',
  });

  const [pagination, setPagination] = useState<IPagination>({
    limit: 10,
    page: 1,
  });

  const [valueForm, setValueForm] = useState<QuerySearch>({
    group: '',
    keyword: '',
  });

  const [{ data: listKey, isFetching }, { data: listGroup }] = useQueries({
    queries: [
      {
        queryKey: ['get-list-key-permission', pagination, valueForm],
        queryFn: () => GroupKeyApi.getListKey({ ...pagination, ...valueForm }),
        staleTime: 300000,
        cacheTime: 300000,
      },
      {
        queryKey: ['get-list-group-permission'],
        queryFn: () => GroupKeyApi.getListGroup(),
        staleTime: 300000,
        cacheTime: 300000,
      },
    ],
  });

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      width: '5%',
    },
    {
      title: 'Nhóm',
      dataIndex: 'group',
      width: '30%',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      width: '30%',
    },
  ];

  const onSubmit = (data: QuerySearch) => {
    setValueForm(data);
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({
      page: page,
      limit: pageSize,
    });
  };

  const handleChangeGroupId = (value: QuerySearch['group']) => {
    onSubmit({ group: value });
  };

  const optionsListGroup = listGroup?.map((item) => ({
    value: item.group,
    label: item.group,
  }));

  return (
    <Modal
      title="Nhóm danh sách"
      okText="Đóng"
      width="90vw"
      open={open}
      onOk={onClose}
      cancelButtonProps={{ className: 'hidden' }}
      closeIcon={false}
      destroyOnClose
    >
      <Form
        className="flex justify-between gap-5 mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormItem className="mb-0 w-full lg:w-[400px]">
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={optionsListGroup}
                allowClear
                onClear={() => {
                  setValue('group', '');
                  handleChangeGroupId('');
                }}
                onChangeCustom={handleChangeGroupId}
                placeholder="Vui lòng nhập"
              />
            )}
          />
        </FormItem>
        <FormItem className="w-full lg:w-[600px] mb-0">
          <Search
            placeholder="Tìm kiếm theo tên nhóm, tiêu đề"
            icon={<MagnifyingGlassOutlined />}
            {...register('keyword')}
          />
        </FormItem>
      </Form>
      <div className="bg-white shadow-xsm rounded-2xl">
        <Table
          loading={isFetching}
          columns={columns}
          data={listKey?.data}
          scroll={{ x: 1500, y: 500 }}
          footer={() => (
            <PaginationCustom
              onChange={handleChangePage}
              total={listKey?.total || 0}
              current={pagination?.page}
              pageSize={pagination?.limit}
              to={listKey?.to}
              from={listKey?.from}
            />
          )}
        />
      </div>
    </Modal>
  );
};

export default GroupList;
