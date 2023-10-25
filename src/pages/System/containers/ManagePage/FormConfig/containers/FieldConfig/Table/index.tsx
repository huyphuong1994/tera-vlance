import { useMutation, useQuery } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionCUD from '_common/component/TableColumnCustom/ActionCUD';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import useConfirm from '_common/hooks/useConfirm';
import { IPagination } from '_common/interface';
import { mergeField, removeKeyFromObject } from '_common/utils';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PaginationProps,
  PlusCircleOutlined,
  Table,
  TableProps,
  Tooltip,
  notification,
} from 'tera-dls';
import { FieldConfigApi } from '../../../_api';
import { IParamsList } from '../../../interfaces';
import CreateConfigField from '../Modal/CreateConfigField';
import DetailConfigField from '../Modal/DetailConfigField';

interface ITableFieldConfig extends TableProps {
  paramsKeyword?: string;
  isAdd?: boolean;
}

const TableFieldConfig = ({
  paramsKeyword,
  isAdd,
  ...props
}: ITableFieldConfig) => {
  const confirm = useConfirm();
  const { formId } = useParams();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [ItemClick, setItemClick] = useState<number>(null);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
  });

  const { data: listData, refetch: getDataTable } = useQuery(
    ['list-field-config'],
    () => {
      const mergeParams: IParamsList = mergeField(
        {
          keyword: paramsKeyword,
          form_id: formId,
        },
        pagination,
      );
      return FieldConfigApi.getList(mergeParams);
    },
  );

  const { mutate: mutateDelete } = useMutation(
    (variables: any) => {
      return FieldConfigApi.delete(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          getDataTable();
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

  const metaData = useMemo(() => {
    const temp = removeKeyFromObject(listData, 'data');
    return temp;
  }, [listData]);

  const buttonKey = {
    update: BUTTON_KEY.MANAGE_PAGE_CONFIG_FIELD_UPDATE,
    detail: BUTTON_KEY.MANAGE_PAGE_CONFIG_FIELD_DETAIL,
    delete: BUTTON_KEY.MANAGE_PAGE_CONFIG_FIELD_DELETE,
  };

  const onDetail = (id: number) => {
    setIsOpenDetail(true);
    setItemClick(id);
  };

  const onEdit = (id: number) => {
    setItemClick(id);
    setIsOpenEdit(true);
  };

  const onDelete = (dataRecord: any) => {
    confirm.warning({
      title: 'Xác nhận xoá trường dữ liệu',
      onOk: () => {
        mutateDelete(dataRecord?.id);
      },
      content: (
        <>
          <p>Bạn có chắc muốn xoá trường dữ liệu </p>
          <p>
            <span className="font-bold">{dataRecord?.title}</span> này không?
          </p>
        </>
      ),
    });
  };

  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };
  const closeModalDetail = () => {
    setIsOpenDetail(false);
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination({
      ...pagination,
      page: page,
      limit: pageSize,
    });
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      key: 'record_number',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Mã trường dữ liệu',
      dataIndex: 'code',
      key: 'code',
      width: '30%',
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Loại dữ liệu',
      key: 'type_field',
      dataIndex: 'type_field',
      render: (record) => record?.title,
    },
    {
      title: 'Key dữ liệu',
      key: 'key_data',
      dataIndex: 'key_data',
    },
    {
      title: 'ClassName',
      key: 'class_name',
      dataIndex: 'class_name',
    },
    {
      title: isAdd && (
        <div className="flex justify-center">
          <Tooltip title="Thêm mới">
            <div>
              <PlusCircleOutlined
                className="w-6 h-6 text-green-500 cursor-pointer"
                onClick={() => setIsOpenEdit(true)}
              />
            </div>
          </Tooltip>
        </div>
      ),
      key: '',
      dataIndex: '',
      width: '8%',
      fixed: 'right',
      render: (record: any) => {
        return (
          <ActionCUD
            buttonKey={buttonKey}
            onClickDetail={() => {
              onDetail(record?.id);
            }}
            onClickUpdate={() => {
              onEdit(record?.id);
            }}
            onClickDelete={() => {
              onDelete(record);
            }}
            activeButtons={['detail', 'update', 'delete']}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (paramsKeyword || pagination) {
      getDataTable();
    }
  }, [paramsKeyword, pagination]);

  return (
    <>
      <div className="bg-white h-full shadow-xsm rounded-2xl">
        <Table
          columns={columns}
          data={listData?.data}
          scroll={{ x: 1500, y: '100%' }}
          className="h-full"
          {...props}
        />
        {metaData?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={metaData?.total || 0}
            defaultPageSize={metaData?.per_page || 10}
            current={metaData?.current_page || 1}
            to={metaData?.to}
            from={metaData?.from}
          />
        )}
      </div>
      {isOpenEdit && (
        <CreateConfigField
          isOpen={isOpenEdit}
          id={ItemClick}
          handleClose={closeModalEdit}
        />
      )}
      {isOpenDetail && (
        <DetailConfigField
          isOpen={isOpenDetail}
          id={ItemClick}
          handleClose={closeModalDetail}
        />
      )}
    </>
  );
};

export default TableFieldConfig;
