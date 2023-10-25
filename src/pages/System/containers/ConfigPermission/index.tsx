import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CountSelection from '_common/component/CountSelection';
import HeaderViewList from '_common/component/HeaderViewList';
import ModalImport from '_common/component/ModalImport';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionDropdown from '_common/component/TableColumnCustom/ActionDropdown';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import { CONFIG_PERMISSION_URL } from '_common/constants/url';
import useConfirm from '_common/hooks/useConfirm';
import { usePermission } from '_common/hooks/usePermission';
import { IPagination } from '_common/interface';
import { ResponseGetApi } from '_common/interface/api';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  ColumnsType,
  DropdownItem,
  Form,
  FormItem,
  MagnifyingGlassOutlined,
  PaginationProps,
  Search,
  Table,
  downloadFile,
  notification,
  useDetectDevice,
} from 'tera-dls';
import { TableRowSelection } from 'tera-dls/lib/components/Table/interface';
import { object, string } from 'yup';
import { RequestImport } from '../ManagePage/interfaces';
import ConfigPermissionApi from './_api';
import CopyConfigPermission from './containers/Copy';
import DetailConfigPermission from './containers/Detail';
import FormConfigPermission from './containers/Form';
import GroupList from './containers/GroupList';
import { ListRole, QuerySearch } from './interfaces';
const schema = object()
  .shape({
    keyword: string().nullable(),
  })
  .required();

const ConfigPermission = () => {
  const { hasPage } = usePermission();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isTablet } = useDetectDevice();
  const [openForm, setOpenForm] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const [openGroupList, setOpenGroupList] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [idPermission, setIdPermission] = useState<number>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [params, setParams] = useState<QuerySearch & IPagination>({
    limit: 10,
    page: 1,
    keyword: '',
  });

  const { data, refetch, isFetching } = useQuery<ResponseGetApi<ListRole[]>>(
    ['get-config-permission', params],
    () => ConfigPermissionApi.getList(params),
  );
  const { mutate: deletePermission } = useMutation(
    (id: string | number) => ConfigPermissionApi.delete(id),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({ message: res?.msg });
          refetch();
        }
      },
      onError(error: any) {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({ message: errorMessage });
      },
    },
  );

  const confirm = useConfirm();
  const buttonKey = {
    create: BUTTON_KEY.CONFIG_PERMISSION_LIST_CREATE,
    copyPermission: BUTTON_KEY.CONFIG_PERMISSION_LIST_COPY,
    settingPermission: BUTTON_KEY.CONFIG_PERMISSION_LIST_SETTING,
    update: BUTTON_KEY.CONFIG_PERMISSION_LIST_UPDATE,
    delete: BUTTON_KEY.CONFIG_PERMISSION_LIST_DELETE,
    detail: BUTTON_KEY.CONFIG_PERMISSION_LIST_DETAIL,
  };

  const handleSearch = (value) => {
    if (isDirty) {
      setParams({ ...params, keyword: value?.keyword });
      reset({ ...value }, { keepValues: true });
    }
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setParams({
      ...params,
      page: page,
      limit: pageSize,
    });
  };

  const onDelete = (id: number, title: string) => {
    confirm.warning({
      title: 'Xác nhận xoá quyền',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa quyền</p>
          <p>
            <span className="font-bold">{title}</span> này không?
          </p>
        </>
      ),
      onOk: () => {
        deletePermission(id);
      },
    });
  };

  const onCloseImport = () => {
    setOpenImport(false);
  };

  const { mutate: mutateImport } = useMutation(
    (variables: RequestImport) => {
      return ConfigPermissionApi.import(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          onCloseImport();
          queryClient.invalidateQueries(['get-config-permission']);
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        confirm.error({
          title: 'LỖI IMPORT DỮ LIỆU',
          content: (
            <>
              <p>Tổng số lỗi: {error?.data?.errors?.length}</p>
              <ul className="list-disc">
                {error?.data?.errors?.map((msgErr) => (
                  <li>{msgErr}</li>
                ))}
              </ul>
            </>
          ),
          cancelButtonProps: {
            className: 'hidden',
          },
          cancelText: 'Đóng',
          align: 'left',
        });
      },
    },
  );

  const { mutate: mutateExport } = useMutation(
    () => {
      return ConfigPermissionApi.export(selectedRowKeys);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          const date = moment().format('DDMMYYYY_HHmmss');
          downloadFile(res?.data?.src, `export_permission_${date}`);
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

  const handleImport = (values) => {
    mutateImport({
      overwrite: values.overwrite,
      file: values?.file,
    });
  };
  const onEdit = (id: number) => {
    setOpenForm(true);
    setIdPermission(id);
  };
  const onCopy = (id: number) => {
    setOpenCopy(true);
    setIdPermission(id);
  };
  const onDetail = (id: number) => {
    setOpenDetail(true);
    setIdPermission(id);
  };
  const onCloseDetail = () => {
    setIdPermission(null);
    setOpenDetail(false);
  };
  const onCloseCopy = () => {
    setIdPermission(null);
    setOpenCopy(false);
  };
  const onCloseForm = () => {
    setOpenForm(false);
    setIdPermission(null);
  };
  const onCloseGroupList = () => {
    setOpenGroupList(false);
  };

  const dropdownItemsAction = (record: ListRole): DropdownItem[] => {
    const dropdownItems: DropdownItem[] = [
      hasPage(buttonKey.copyPermission) && {
        key: 1,
        label: <a onClick={() => onCopy(record.id)}>Sao chép quyền</a>,
      },
      hasPage(buttonKey.settingPermission) && {
        key: 2,
        label: 'Cấu hình quyền',
        onClick: () =>
          navigate(CONFIG_PERMISSION_URL.setting.path + '/' + record.id, {
            state: { titlePermission: record.title },
          }),
      },
      hasPage(buttonKey.update) && {
        key: 3,
        label: 'Sửa',
        onClick: () => onEdit(record.id),
      },
      hasPage(buttonKey.delete) && {
        key: 4,
        label: <span className="text-red-500">Xoá</span>,
        onClick: () => onDelete(record.id, record.title),
      },
    ];
    return dropdownItems;
  };

  const columns: ColumnsType<ListRole> = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      width: '5%',
    },
    {
      title: 'Mã quyền',
      dataIndex: 'code',
      width: '30%',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      width: '30%',
      render: (note: string) => {
        return <span className="line-clamp-5">{note}</span>;
      },
    },
    {
      title: '',
      width: '7%',
      render: (record: ListRole) => (
        <ActionDropdown
          onClickDetail={() => onDetail(record.id)}
          dropdownItems={dropdownItemsAction(record)}
          trigger="click"
          buttonDetailKey={buttonKey.detail}
        />
      ),
    },
  ];

  const dropdownItemsConfig: DropdownItem[] = [
    {
      key: 'export',
      label: 'Export dữ liệu excel',
      onClick: () => mutateExport(),
    },
    {
      key: 'import',
      label: 'Import dữ liệu excel',
      onClick: () => setOpenImport(true),
    },
    {
      key: 'group-list',
      label: 'Danh sách nhóm',
      onClick: () => setOpenGroupList(true),
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => setOpenImport(true),
    },
  ];

  const rowSelections: TableRowSelection<ListRole> = {
    selectedRowKeys,
    onChange: (rowKeys) => setSelectedRowKeys(rowKeys),
  };
  return (
    <>
      <HeaderViewList
        title="Danh sách quyền"
        onClickButtonAdd={() => setOpenForm(true)}
        buttonCreatingKey={buttonKey.create}
        dropdownConfig={dropdownItemsConfig}
        dropdownMore={isTablet ? dropdownMore : undefined}
      >
        <Form
          onSubmit={handleSubmit(handleSearch)}
          className="sm:w-full md:w-full lg:w-[400px]"
        >
          <FormItem className="mb-0">
            <Search
              placeholder="Tìm kiếm theo mã, tên quyền"
              icon={<MagnifyingGlassOutlined />}
              className="w-full h-10"
              {...register('keyword')}
            />
          </FormItem>
        </Form>
      </HeaderViewList>
      <CountSelection count={selectedRowKeys?.length} />
      <div className="bg-white shadow-xsm rounded-2xl">
        <Table
          columns={columns}
          data={data?.data}
          loading={isFetching}
          scroll={{ x: 1500 }}
          rowSelection={rowSelections}
        />
        {data?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={data?.total || 0}
            current={data?.current_page}
            pageSize={data?.per_page}
            to={data?.to}
            from={data?.from}
          />
        )}
      </div>
      {openForm && (
        <FormConfigPermission
          open={openForm}
          onClose={onCloseForm}
          id={idPermission}
        />
      )}
      {openDetail && (
        <DetailConfigPermission
          open={openDetail}
          onCloseModal={onCloseDetail}
          id={idPermission}
        />
      )}
      {openCopy && (
        <CopyConfigPermission
          open={openCopy}
          onClose={onCloseCopy}
          id={idPermission}
        />
      )}
      {openImport && (
        <ModalImport
          open={openImport}
          onCancel={onCloseImport}
          onOk={handleImport}
        />
      )}
      {openGroupList && (
        <GroupList open={openGroupList} onClose={onCloseGroupList} />
      )}
    </>
  );
};

export default ConfigPermission;
