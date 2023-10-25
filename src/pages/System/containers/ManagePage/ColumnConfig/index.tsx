import HeaderViewList from '_common/component/HeaderViewList';
import { useState } from 'react';
import { ExportColumn, ImportColumn, IParams } from './interfaces';
import TableColumConfig from './containers/Table';
import ColumnConfigHeader from './containers/Header';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  downloadFile,
  DropdownItem,
  ItemType,
  notification,
  useDetectDevice,
} from 'tera-dls';
import ColumnConfigForm from './containers/Form';
import { BUTTON_KEY } from '_common/constants/permission';
import { useNavigate, useParams } from 'react-router-dom';
import { MANAGE_PAGE_URL } from '_common/constants/url';
import ModalImport from '_common/component/ModalImport';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ColumnConfigApi from './_api';
import { messageError } from '_common/constants/message';
import { ImportFile } from '_common/interface';
import moment from 'moment';
import useConfirm from '_common/hooks/useConfirm';

function ColumnConfig() {
  const { isTablet } = useDetectDevice();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenImport, setIsOpenImport] = useState<boolean>(false);
  const [params, setParams] = useState<IParams>({
    keyword: '',
  });
  const [rowsSelected, setRowsSelected] = useState<React.Key[]>(null);
  const navigate = useNavigate();
  const { pageId, tableId } = useParams();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { mutate: importExcel } = useMutation(
    (variable: ImportColumn) => ColumnConfigApi.import(variable),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          queryClient.invalidateQueries(['get-list-column-config']);
          setIsOpenImport(false);
        }
      },
      onError(error: any) {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });

        confirm.error({
          title: 'LỖI IMPORT DỮ LIỆU',
          content: (
            <ul className="list-disc">
              {error?.data?.errors?.map((msgErr) => (
                <li>{msgErr}</li>
              ))}
            </ul>
          ),
          okButtonProps: {
            className: 'hidden',
          },
          cancelText: 'Đóng',
          align: 'left',
        });
      },
    },
  );

  const { mutate: exportExcel } = useMutation(
    (variable: ExportColumn) => ColumnConfigApi.export(variable),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          const date = moment().format('DDMMYYYY_HHmmss');
          downloadFile(res?.data?.src, `export_column_${date}`);
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

  const handleSearch = (value) => {
    setParams({ ...params, keyword: value?.keyword });
  };

  const handleExportFile = () => {
    const params: ExportColumn = {
      id_selected: rowsSelected,
      table_id: +tableId,
    };
    exportExcel(params);
  };

  const handleImportFile = (values: ImportFile) => {
    const data: ImportColumn = {
      ...values,
      table_id: tableId,
    };
    importExcel(data);
  };

  const dropdownConfig: DropdownItem[] = [
    {
      key: 1,
      label: 'Export dữ liệu excel',
      onClick: handleExportFile,
    },
    {
      key: 2,
      label: 'Import dữ liệu excel',
      onClick: () => setIsOpenImport(true),
    },
  ];

  const BreadcrumbItem: ItemType[] = [
    {
      title: (
        <a onClick={() => navigate(MANAGE_PAGE_URL.list.path)}>
          Danh sách trang
        </a>
      ),
    },
    {
      title: (
        <a
          onClick={() =>
            navigate(`${MANAGE_PAGE_URL.tableConfig.path}/${pageId}`)
          }
        >
          Danh sách bảng
        </a>
      ),
    },
    {
      title: 'Cấu hình cột',
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => console.log('xoá nhiều dữ liệu'),
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
              <Breadcrumb separator={'>'} items={BreadcrumbItem} />
            </div>
          </>
        }
        onClickButtonAdd={() => setIsOpenForm(true)}
        dropdownConfig={dropdownConfig}
        dropdownMore={isTablet ? dropdownMore : undefined}
        buttonCreatingKey={BUTTON_KEY.COLUMN_CONFIG_LIST_CREATE}
      >
        <ColumnConfigHeader onSearch={handleSearch} />
      </HeaderViewList>

      {rowsSelected?.length > 0 && (
        <div className="flex items-center p-5 mb-6 text-green-700 bg-green-300 shadow-xsm rounded-2xl h-9 ">
          Đã chọn {rowsSelected.length} mục
        </div>
      )}

      <TableColumConfig
        tableId={tableId}
        params={params}
        tableProps={{
          rowSelection: {
            onChange: (rowsSelected) => setRowsSelected(rowsSelected),
          },
        }}
      />

      {isOpenForm && (
        <ColumnConfigForm
          onRefetch={() =>
            queryClient.invalidateQueries(['get-list-column-config'])
          }
          open={isOpenForm}
          onClose={() => setIsOpenForm(false)}
          id={null}
          tableId={tableId}
        />
      )}
      {isOpenImport && (
        <ModalImport
          open={isOpenImport}
          onCancel={() => setIsOpenImport(false)}
          onOk={handleImportFile}
        />
      )}
    </>
  );
}

export default ColumnConfig;
