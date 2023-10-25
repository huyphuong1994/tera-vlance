import { useMutation, useQuery } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionDropdown from '_common/component/TableColumnCustom/ActionDropdown';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import { MANAGE_PAGE_URL } from '_common/constants/url';
import useConfirm from '_common/hooks/useConfirm';
import { usePermission } from '_common/hooks/usePermission';
import { filterField } from '_common/utils';
import { statusConfigColor } from 'pages/System/constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ColumnsType,
  DropdownItem,
  PaginationProps,
  PlusCircleOutlined,
  Table,
  TableProps,
  Tag,
  Tooltip,
  getQueryParams,
  notification,
  updateQueryParams,
  useDetectDevice,
} from 'tera-dls';
import SystemTableConfigApi from '../../_api';
import { LAYOUT } from '../../constants';
import TableConfigForm from '../Form';

interface IFromModel {
  open: boolean;
  id?: number;
}

interface IParams {
  page: number;
  limit: number;
}
interface IProps {
  keyword?: string;
  pageId: string;
  tableProps?: TableProps;
  onOpenAddForm?: boolean;
  onCloseAddForm?: (value: boolean) => void;
  isAdd?: boolean;
  onUpdateKeyword?: (keyword) => void;
}

export const updateURLQuery = ({
  location,
  navigate,
  params,
  isReplace = true,
}) => {
  const currentQueryParams: { [key: string]: any } = getQueryParams(
    location.search,
  );
  const queryParams = updateQueryParams(
    isReplace ? params : { ...currentQueryParams, ...params },
  );

  navigate(location.pathname + queryParams);
};

const TableConfig = (props: IProps) => {
  const {
    pageId,
    onOpenAddForm = false,
    onCloseAddForm,
    isAdd = false,
    keyword = '',
    tableProps = {},
    onUpdateKeyword,
  } = props;

  const { hasPage } = usePermission();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const { isMobile } = useDetectDevice();

  const [formModel, setFromModel] = useState<IFromModel>({ open: false });
  const [params, setParams] = useState<IParams>({ page: 1, limit: 10 });

  const location = useLocation();
  const updateParams = (queryParams: any): void => {
    queryParams?.page &&
      setParams({
        page: Number(queryParams.page),
        limit: Number(queryParams.limit),
      });
  };

  const updateKeyword = (queryParams: any): void => {
    queryParams?.keyword &&
      onUpdateKeyword &&
      onUpdateKeyword(queryParams.keyword);
  };

  useEffect(() => {
    const queryParams: { [key: string]: any } = getQueryParams(
      location?.search,
    );
    updateParams(queryParams);
    updateKeyword(queryParams);
  }, [location]);

  const { data, refetch } = useQuery(
    ['get-table-config-list', params, pageId, keyword],
    () =>
      SystemTableConfigApi.getList({
        params: filterField({ ...params, page_id: pageId, keyword: keyword }),
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
      enabled: !!pageId,
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  useEffect(() => {
    onOpenAddForm && setFromModel({ open: true });
  }, [onOpenAddForm]);

  useEffect(() => {
    refetch();
  }, [params.limit, params.page, keyword, pageId]);

  const mutateDelete = useMutation(
    (id) => SystemTableConfigApi.delete({ id }),
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          refetch();
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

  const handleDelete = (id, name) => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA BẢNG DỮ LIỆU',
      content: (
        <p>
          Bạn có chắc chắn muốn xóa bảng dữ liệu
          <span className="font-bold"> {name} </span>
          này không?
        </p>
      ),
      onOk: () => {
        mutateDelete.mutate(id);
      },
    });
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setParams({
      page: page,
      limit: pageSize,
    });
    updateURLQuery({
      location,
      navigate,
      params: { page: page, limit: pageSize, keyword },
    });
  };

  const generateDropDownItems = (record): DropdownItem[] => {
    const dropdownItems: DropdownItem[] = [];

    hasPage(BUTTON_KEY.SYSTEM_PAGE_TABLE_FIELD_CONFIG) &&
      dropdownItems.push({
        key: 1,
        label: (
          <a
            onClick={() =>
              navigate(
                `${MANAGE_PAGE_URL.columnConfig.path}/${pageId}/column-config/${record?.id}`,
              )
            }
          >
            Cấu hình cột dữ liệu
          </a>
        ),
      });
    hasPage(BUTTON_KEY.SYSTEM_PAGE_TABLE_CONFIG_UPDATE) &&
      dropdownItems.push({
        key: 2,
        label: (
          <a onClick={() => setFromModel({ open: true, id: record?.id })}>
            Sửa
          </a>
        ),
      }),
      hasPage(BUTTON_KEY.SYSTEM_PAGE_TABLE_CONFIG_DELETE) &&
        dropdownItems.push({
          key: 3,
          label: (
            <a
              className="text-red-500"
              onClick={() => handleDelete(record?.id, record?.name)}
            >
              Xóa
            </a>
          ),
        });

    return dropdownItems;
  };

  const columns: ColumnsType<any> = [
    {
      dataIndex: 'record_number',
      title: 'STT',
      width: 55,
    },
    {
      title: 'Mã bảng dữ liệu',
      dataIndex: 'concatenated_code',
      width: 122,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'name',
      width: 122,
    },
    {
      title: 'Nhóm bảng dữ liệu',
      dataIndex: 'group',
      render: (data) => data?.title,
      width: 122,
    },
    {
      title: 'Layout',
      dataIndex: 'layout',
      width: 122,
      render: (data) => LAYOUT[data],
    },
    {
      title: 'className',
      dataIndex: 'class_name',
      width: 122,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 116,
      render: (data, record) => {
        return (
          <Tag className="w-fit" color={statusConfigColor[data]}>
            {record?.status_text}
          </Tag>
        );
      },
    },
    {
      title:
        isAdd && hasPage(BUTTON_KEY.SYSTEM_PAGE_TABLE_CONFIG_CREATE) ? (
          <Tooltip title="Thêm mới">
            <div className="w-full flex justify-center items-center">
              <PlusCircleOutlined
                onClick={() => setFromModel({ open: true })}
                className="w-6 h-6 text-green-500 cursor-pointer"
              />
            </div>
          </Tooltip>
        ) : (
          ''
        ),
      dataIndex: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <ActionDropdown
              onClickDetail={() =>
                navigate(
                  `${MANAGE_PAGE_URL.tableConfigDetail.path}/${pageId}/table-config-detail/${record.id}`,
                )
              }
              dropdownItems={generateDropDownItems(record)}
              trigger="click"
              buttonDetailKey={BUTTON_KEY.SYSTEM_PAGE_TABLE_CONFIG_DETAIL}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="bg-white shadow-xsm rounded-2xl overflow-hidden">
        <Table
          columns={columns}
          data={data?.data ?? []}
          className="rounded-sm"
          hiddenColumns={
            isMobile ? ['status', 'class_name', 'group', 'layout'] : []
          }
          {...tableProps}
        />
        {data?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={data?.total || 0}
            current={data?.current_page || 1}
            pageSize={data?.per_page}
            to={data?.to}
            from={data?.from}
          />
        )}
      </div>

      {formModel?.open && (
        <TableConfigForm
          open={formModel.open}
          id={formModel?.id}
          pageId={Number(pageId)}
          onClose={() => {
            setFromModel({ open: false });
            onCloseAddForm && onCloseAddForm(false);
          }}
          onChangeSuccess={() => {
            refetch();
          }}
        />
      )}
    </>
  );
};

export default TableConfig;
