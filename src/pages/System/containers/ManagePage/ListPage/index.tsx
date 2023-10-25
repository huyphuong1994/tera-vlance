import { useMutation, useQuery } from '@tanstack/react-query';
import HeaderViewList from '_common/component/HeaderViewList';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionDropdown from '_common/component/TableColumnCustom/ActionDropdown';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import {
  MANAGE_PAGE_CONFIG_FORM_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import useConfirm from '_common/hooks/useConfirm';
import { usePermission } from '_common/hooks/usePermission';
import { IPagination } from '_common/interface';
import { mergeField } from '_common/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownItem,
  Icon,
  PaginationProps,
  Table,
  Tag,
  getQueryParams,
  notification,
  updateQueryParams,
  useDetectDevice,
} from 'tera-dls';
import { statusOnOffString } from '../constants';
import { IFormModel } from '../interfaces';
import ManagePageApi from './_api';
import ManagePageCopy from './containers/Copy';
import ManagePageFilter from './containers/Filter';
import ManagePageForm from './containers/Form';
import ManagePageHeader from './containers/Header';
import { IFilter, IParams } from './interfaces';

const ManagePage = () => {
  const { hasPage } = usePermission();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { isMobile } = useDetectDevice();

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [formModel, setFormModel] = useState<IFormModel>({ open: false });
  const [idPage, setIdPage] = useState<number>(null);

  const [params, setParams] = useState<IParams>({
    keyword: '',
  });
  const [filter, setFilter] = useState<IFilter>({
    status: null,
    business_id: null,
    parent_menu_id: null,
  });
  const [pagination, setPagination] = useState<IPagination>({
    limit: 10,
    page: 1,
  });

  const { search } = useLocation();
  const queryParams = getQueryParams(search) as any;

  const {
    data: listPage,
    refetch,
    isLoading,
  } = useQuery(
    ['get-list-page', params, filter, pagination],
    () => ManagePageApi.getList(mergeField(params, filter, pagination)),
    {
      cacheTime: 300000,
      staleTime: 300000,
    },
  );

  const { mutate: deletePage, isLoading: loadingDelete } = useMutation(
    (id: string | number) => ManagePageApi.delete(id),
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

  const handleQueryParams = (query: IFilter | IPagination | IParams) => {
    const paramString = updateQueryParams({
      ...pagination,
      ...params,
      ...filter,
      ...query,
    });
    navigate(location.pathname + paramString);
  };

  const handleSearch = (value) => {
    handleQueryParams({
      page: 1,
      keyword: value?.keyword,
    });
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    handleQueryParams({
      page: page,
      limit: pageSize,
    });
  };

  const handleFilter = (values: IFilter) => {
    handleQueryParams({
      page: 1,
      ...values,
    });
  };

  const handleDeletePage = (id: string | number, name: string) => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA TRANG',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa trang</p>
          <p>{name} này không?</p>
        </>
      ),
      onOk: () => {
        deletePage(id);
      },
    });
  };

  useEffect(() => {
    setPagination({
      limit: Number(queryParams?.limit) || 10,
      page: Number(queryParams?.page) || 1,
    });
    setFilter({
      status: queryParams?.status || null,
      business_id: Number(queryParams?.business_id) || null,
      parent_menu_id: Number(queryParams?.parent_menu_id) || null,
    });
    setParams({ keyword: queryParams?.keyword || null });
  }, [search]);

  const renderDropdown = (record): DropdownItem[] => {
    const dropdownItems: DropdownItem[] = [];
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_COPY_PAGE) &&
      dropdownItems.push({
        key: 1,
        label: 'Sao chép trang',
        onClick: () => {
          setIdPage(record?.id);
          setIsCopy(true);
        },
      });
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_CONTROL) &&
      dropdownItems.push({
        key: 2,
        label: 'Cấu hình control',
        onClick: () =>
          navigate(`${MANAGE_PAGE_URL.controlConfig.path}/${record?.id ?? 0}`),
      }),
      hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_TABLE) &&
        dropdownItems.push({
          key: 3,
          label: 'Cấu hình bảng dữ liệu',
          onClick: () =>
            navigate(`${MANAGE_PAGE_URL.tableConfig.path}/${record?.id}`),
        });
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_FORM) &&
      dropdownItems.push({
        key: 4,
        label: 'Cấu hình form dữ liệu',
        onClick: () =>
          navigate(
            `${MANAGE_PAGE_CONFIG_FORM_URL.list.path}/${record?.id ?? 0}`,
          ),
      });
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_SEARCH_FILTER) &&
      dropdownItems.push({
        key: 5,
        label: 'Cấu hình tìm kiếm và lọc',
      });
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_UPDATE) &&
      dropdownItems.push({
        key: 6,
        label: 'Sửa',
        onClick: () => setFormModel({ open: true, id: record?.id }),
      });
    hasPage(BUTTON_KEY.MANAGE_PAGE_LIST_DELETE) &&
      dropdownItems.push({
        key: 7,
        label: <span className="text-red-500">Xóa</span>,
        onClick: () => handleDeletePage(record?.id, record?.name),
      });
    return dropdownItems;
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      width: 60,
      align: 'center',
    },
    {
      title: 'Mã trang',
      dataIndex: 'concatenated_code',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Tên trang',
      dataIndex: 'name',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Menu cha',
      dataIndex: 'parent_menu',
      width: 200,
      render: (parent_menu) => parent_menu?.title,
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      width: 200,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 100,
      render: (icon) => <Icon type={icon} />,
    },
    {
      title: 'Business_id',
      dataIndex: 'business_id',
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (text) => (
        <Tag color={statusOnOffString[text]?.color}>
          {statusOnOffString[text]?.name}
        </Tag>
      ),
    },
    {
      dataIndex: '',
      width: 88,
      fixed: 'right',
      render: (_, record) => {
        const dropdownItems = renderDropdown(record);
        return (
          <ActionDropdown
            onClickDetail={() =>
              navigate(`${MANAGE_PAGE_URL.detail.path}/${record?.id}`)
            }
            dropdownItems={dropdownItems}
            trigger="click"
            buttonDetailKey={BUTTON_KEY.MANAGE_PAGE_LIST_DETAIL}
          />
        );
      },
    },
  ];

  return (
    <>
      <HeaderViewList
        title="DANH SÁCH TRANG"
        onClickButtonAdd={() => setFormModel({ open: true })}
        onClickFilter={() => setIsFilter(true)}
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_LIST_CREATE}
      >
        <ManagePageHeader onSearch={handleSearch} />
      </HeaderViewList>
      <div className="bg-white shadow-xsm rounded-2xl">
        <Table
          columns={columns}
          data={listPage?.data || []}
          rowKey={(record: any) => record?.id}
          loading={isLoading || loadingDelete}
          hiddenColumns={
            isMobile
              ? [
                  'title',
                  'parent_menu',
                  'path',
                  'icon',
                  'business_id',
                  'status',
                ]
              : []
          }
        />
        {listPage?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={listPage?.total || 0}
            current={pagination.page || 1}
            pageSize={listPage?.per_page}
            to={listPage?.to}
            from={listPage?.from}
          />
        )}
      </div>
      {isFilter && (
        <ManagePageFilter
          open={isFilter}
          onClose={() => setIsFilter(false)}
          onFilter={handleFilter}
          initialValue={filter}
        />
      )}
      {isCopy && (
        <ManagePageCopy
          pageId={idPage}
          onClose={() => setIsCopy(false)}
          open={isCopy}
        />
      )}
      {formModel.open && (
        <ManagePageForm
          open={formModel.open}
          id={formModel?.id}
          onClose={() => {
            setFormModel({ open: false });
          }}
          onChangeDataSuccess={() => {
            refetch();
          }}
        />
      )}
    </>
  );
};

export default ManagePage;
