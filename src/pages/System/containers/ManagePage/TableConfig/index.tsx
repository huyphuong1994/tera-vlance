import { useMutation, useQueryClient } from '@tanstack/react-query';
import HeaderViewList from '_common/component/HeaderViewList';
import ModalImport from '_common/component/ModalImport';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import { MANAGE_PAGE_URL } from '_common/constants/url';
import moment from 'moment';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  DocumentDuplicateOutlined,
  DropdownItem,
  downloadFile,
  notification,
  useDetectDevice,
} from 'tera-dls';
import SystemTableConfigApi from './_api';
import useConfirm from '_common/hooks/useConfirm';
import TableConfigCopy from './container/Copy';
import SearchForm from './container/Search';
import TableConfig, { updateURLQuery } from './container/Table';
import { ICopyModel } from './interface';

const TableConfigOverview = () => {
  const { id: pageId } = useParams();
  const { isDesktop, isTablet } = useDetectDevice();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>();
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [copyModel, setCopyModel] = useState<ICopyModel>({ open: false });
  const [openImport, setOpenImport] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const handleAdd = () => setOpenAddForm(true);

  const handleSearch = ({ keyword }) => {
    setKeyword(keyword);
    updateURLQuery({
      location,
      navigate,
      params: { keyword, page: 1 },
      isReplace: false,
    });
  };

  const showError = (error) => {
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
      okButtonProps: {
        className: 'hidden',
      },
      cancelText: 'Đóng',
      align: 'left',
    });
  };

  const { mutate: mutateImport } = useMutation(
    (variables: any) => {
      return SystemTableConfigApi.import(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          notification.success({
            message: msg,
          });
          setOpenImport(false);
          queryClient.invalidateQueries(['get-table-config-list']);
        }
      },
      onError: (error: any) => {
        showError(error);
      },
    },
  );

  const { mutate: exportExcel } = useMutation(
    (variables: any) => SystemTableConfigApi.export(variables),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          const date = moment().format('DDMMYYYY_HHmmss');
          downloadFile(res?.data?.src, `export_table_${date}`);
        }
      },
      onError(error: any) {
        const errorMessage = error?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  const handleImport = (values): void => {
    mutateImport({ ...values, page_id: pageId });
  };

  const handleExport = (): void => {
    exportExcel({ id_selected: selectedRowKeys, page_id: pageId });
  };

  const dropdownItemsConfig: DropdownItem[] = [
    {
      label: 'Export dữ liệu excel',
      key: 'export',
      onClick: () => handleExport(),
    },
    {
      label: 'Import dữ liệu excel',
      key: 'import',
      onClick: () => setOpenImport(true),
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => setOpenImport(true),
    },
  ];

  return (
    <>
      <HeaderViewList
        title={
          <>
            <div className="page-breadcrumb">
              <div className="cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowSmallLeftSolid width={24} height={24} />
              </div>
              <Breadcrumb
                separator={'>'}
                items={[
                  {
                    title: (
                      <a
                        onClick={() => navigate(`${MANAGE_PAGE_URL.list.path}`)}
                      >
                        Danh sách trang
                      </a>
                    ),
                  },
                  {
                    title: 'Cấu hình bảng dữ liệu',
                  },
                ]}
              />
            </div>
          </>
        }
        onClickButtonAdd={handleAdd}
        dropdownConfig={dropdownItemsConfig}
        dropdownMore={isTablet ? dropdownMore : undefined}
        buttonCreatingKey={BUTTON_KEY.SYSTEM_PAGE_TABLE_CONFIG_CREATE}
      >
        {isDesktop && (
          <Button
            className="rounded-xsm mr-2.5 flex text-base items-center gap-2.5"
            onClick={() => setCopyModel({ open: true, pageId: Number(pageId) })}
          >
            <DocumentDuplicateOutlined width={'1rem'} height={'1rem'} />
            <span className="font-normal "> Sao chép bảng dữ liệu</span>
          </Button>
        )}

        <SearchForm onSearch={handleSearch} value={keyword} />
      </HeaderViewList>

      {selectedRowKeys?.length ? (
        <div className="flex items-center p-5 mb-6 text-green-700 bg-green-300 shadow-xsm rounded-2xl h-9 ">
          Đã chọn {selectedRowKeys.length} mục
        </div>
      ) : (
        ''
      )}
      <TableConfig
        keyword={keyword}
        pageId={pageId}
        onOpenAddForm={openAddForm}
        onCloseAddForm={() => setOpenAddForm(false)}
        onUpdateKeyword={setKeyword}
        tableProps={{
          rowKey: 'id',
          rowSelection: {
            onChange: setSelectedRowKeys,
          },
        }}
      />
      {copyModel?.open && (
        <TableConfigCopy
          open={copyModel.open}
          pageId={copyModel?.pageId}
          onClose={() => {
            setCopyModel({ open: false });
          }}
          onCopySuccess={() =>
            queryClient.invalidateQueries(['get-table-config-list'])
          }
        />
      )}

      {openImport && (
        <ModalImport
          open={openImport}
          onOk={handleImport}
          onCancel={() => setOpenImport(false)}
        />
      )}
    </>
  );
};

export default TableConfigOverview;
