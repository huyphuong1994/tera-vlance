import { notification, PaginationProps, Table } from 'tera-dls';
import ActionCUD from '../../../../../_common/component/TableColumnCustom/ActionCUD';
import { BUTTON_KEY } from '../../../../../_common/constants/permission';
import { useMutation, useQuery } from '@tanstack/react-query';
import { filterField } from '../../../../../_common/utils';
import { messageError } from '../../../../../_common/constants/message';
import { useEffect, useState } from 'react';
import { updateURLQuery } from '../../../../System/containers/ManagePage/TableConfig/container/Table';
import { useNavigate } from 'react-router-dom';
import PaginationCustom from '../../../../../_common/component/PaginationCustom';
import useConfirm from '../../../../../_common/hooks/useConfirm';
import { EQUIPMENT_PAGE_URL } from '../../../../../_common/constants/url';
import CategoryPageApi from '../../_api';
import CategoryForm from '../Form';

interface IParams {
  page: number;
  limit: number;
}

interface ITableCategoryProps {
  keyword: string;
}

const TableCategory = (props: ITableCategoryProps) => {
  const { keyword } = props;
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });
  const [idColumn, setIdColumn] = useState<number | string>(null);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const buttonKey = {
    create: BUTTON_KEY.COLUMN_CONFIG_LIST_CREATE,
    update: BUTTON_KEY.COLUMN_CONFIG_LIST_UPDATE,
    detail: BUTTON_KEY.COLUMN_CONFIG_LIST_DETAIL,
    delete: BUTTON_KEY.COLUMN_CONFIG_LIST_DELETE,
  };

  const { data, refetch } = useQuery(
    ['get-table-category-list', params],
    () => {
      return CategoryPageApi.getEqpCategoryList({
        params: filterField({ ...params, keyword }),
      });
    },
    {
      staleTime: 300000,
      cacheTime: 300000,
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  console.log(data);

  const { mutate: deleteColumn } = useMutation(
    (id: number | string) => CategoryPageApi.deleteCategory(id),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          refetch();
        }
      },
      onError(error: any) {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const handleDetail = (id: number) => {
    setIsOpenForm(true);
    setIdColumn(id);
    navigate(`${EQUIPMENT_PAGE_URL.detail.path}/${id}`);
  };

  const handleUpdate = (id: number) => {
    setIsOpenForm(true);
    setIdColumn(id);
  };

  const handleDelete = (id: number, name: string) => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA CỘT DỮ LIỆU',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa cột</p>
          <p>{name} này không?</p>
        </>
      ),
      onOk: () => {
        deleteColumn(id);
      },
    });
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      width: 80,
      fixed: 'center',
      render: (_, record, index) => {
        return <span>{index + (params.page - 1) * params.limit + 1}</span>;
      },
    },
    {
      title: 'Mã nhóm',
      dataIndex: 'code',
      width: 350,
      align: 'left',
    },
    {
      title: 'Tên nhóm',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: 'Số thiết bị có trong nhóm',
      dataIndex: 'total',
      width: 200,
    },
    {
      title: '',
      dataIndex: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <ActionCUD
              buttonKey={buttonKey}
              onClickDetail={() => handleDetail(record?.id)}
              onClickUpdate={() => handleUpdate(record?.id)}
              onClickDelete={() => handleDelete(record?.id, record?.name)}
            ></ActionCUD>
          </>
        );
      },
    },
  ];

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setParams({
      page: page,
      limit: pageSize,
    });
    updateURLQuery({
      location,
      navigate,
      params: { page: page, limit: pageSize },
    });
  };

  useEffect(() => {
    refetch();
  }, [params.limit, params.page, status, keyword]);

  return (
    <>
      <Table
        columns={columns}
        data={data?.data || []}
        rowKey={(record: any) => record?.id}
        // loading={isLoading}
      />
      {data?.total > 0 && (
        <PaginationCustom
          onChange={handleChangePage}
          total={data?.total || 0}
          current={data?.current_page || 1}
          pageSize={data?.per_page}
          to={data?.data?.to}
          from={data?.data?.from}
        />
      )}
      {isOpenForm && (
        <CategoryForm
          onRefetch={refetch}
          id={idColumn}
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
        />
      )}
    </>
  );
};

export default TableCategory;
