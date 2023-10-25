import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CardForm from '_common/component/CardForm';
import { messageError } from '_common/constants/message';
import { useParams } from 'react-router';
import {
  AdjustmentsHorizontalOutlined,
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  Dropdown,
  DropdownItem,
  ItemType,
  PencilSquareOutlined,
  Tag,
  XMarkOutlined,
  downloadFile,
  notification,
} from 'tera-dls';
import SystemTableConfigApi from '../../_api';
import { useNavigate } from 'react-router-dom';
import TableConfigForm from '../Form';
import { useEffect, useState } from 'react';
import useConfirm from '_common/hooks/useConfirm';
import { IFormModel } from '../../../interfaces';
import moment from 'moment';
import { statusConfigColor } from 'pages/System/constants';
import ModalImport from '_common/component/ModalImport';
import TableColumConfig from '../../../ColumnConfig/containers/Table';
import { MANAGE_PAGE_URL } from '_common/constants/url';
import ColumnConfigApi from '../../../ColumnConfig/_api';
import { ExportColumn, ImportColumn } from '../../../ColumnConfig/interfaces';
import { ImportFile } from '_common/interface';

const TableConfigDetail = () => {
  const { pageId, tableId } = useParams();
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const [formModel, setFormModel] = useState<IFormModel>({ open: false });
  const [openImport, setOpenImport] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: detail, refetch } = useQuery(
    ['get-table-config-detail', tableId],
    () => SystemTableConfigApi.getDetail({ id: tableId }),
    {
      staleTime: 300000,
      cacheTime: 300000,
      enabled: !!tableId,
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  useEffect(() => {
    tableId && refetch();
  }, [tableId]);

  const backList = () => {
    navigate(`${MANAGE_PAGE_URL.tableConfig.path}/${pageId}`);
  };
  const mutateDelete = useMutation(
    (id) => SystemTableConfigApi.delete({ id }),
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          backList();
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

  const handleDelete = (id) => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA BẢNG DỮ LIỆU',
      content: (
        <p>
          Bạn có chắc chắn muốn xoá bảng dữ liệu
          <span className="font-bold"> {detail?.name}</span> này không?
        </p>
      ),
      onOk: () => {
        mutateDelete.mutate(id);
      },
      className: 'xxs:w-[95%]',
    });
  };

  const { mutate: importExcel } = useMutation(
    (variable: ImportColumn) => ColumnConfigApi.import(variable),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          queryClient.invalidateQueries(['get-list-column-config']);
          setOpenImport(false);
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

  const handleImport = (values: ImportFile) => {
    const data: ImportColumn = {
      ...values,
      table_id: tableId,
    };
    importExcel(data);
  };

  const handleExport = () => {
    const params: ExportColumn = {
      id_selected: [],
      table_id: +tableId,
    };
    exportExcel(params);
  };

  const data = [
    {
      key: '1',
      title: 'Mã bảng dữ liệu',
      value: detail?.concatenated_code,
    },
    {
      key: '5',
      title: 'Layout',
      value: detail?.layout,
    },
    {
      key: '8',
      title: 'Người tạo',
      value: `${detail?.employee_created?.code} - ${detail?.employee_created?.full_name}`,
    },
    {
      key: '2',
      title: 'Tiêu đề',
      value: detail?.name,
    },
    {
      key: '6',
      title: 'className',
      value: detail?.class_name,
    },
    {
      key: '9',
      title: 'Ngày tạo',
      value: detail?.created_at
        ? moment(detail.created_at).format('DD/MM/YYYY - hh:mm')
        : '',
    },
    {
      key: '3',
      title: 'Nhóm bảng dữ liệu ',
      value: detail?.group?.title,
    },
    {
      key: '7',
      title: 'Thứ tự đứng sau',
      value:
        detail?.standing_behind === 0
          ? 'Đứng đầu'
          : detail?.standing_behind?.name,
    },
    {
      key: '10',
      title: 'Người cập nhật',
      value: detail?.employee_updated
        ? `${detail?.employee_updated?.code} - ${detail?.employee_updated?.full_name}`
        : '',
    },
    {
      key: '4',
      title: 'Trạng thái',
      value: (
        <Tag className="w-fit" color={statusConfigColor[detail?.status]}>
          {detail?.status_text}
        </Tag>
      ),
    },
    { key: '100' },
    {
      key: '11',
      title: 'Ngày cập nhật',
      value:
        detail?.updated_at && detail?.employee_updated
          ? moment(detail.updated_at).format('DD/MM/YYYY - hh:mm')
          : '',
    },
  ];

  const itemsDropdown: DropdownItem[] = [
    {
      label: 'Export dữ liệu excel',
      key: 'Export',
      onClick: handleExport,
    },
    {
      label: 'Import dữ liệu excel',
      key: 'Import',
      onClick: () => setOpenImport(true),
    },
  ];

  const breadcrumbItem: ItemType[] = [
    {
      title: (
        <a
          className="cursor-pointer"
          onClick={() => navigate(`${MANAGE_PAGE_URL.list.path}`)}
        >
          Danh sách trang
        </a>
      ),
    },
    {
      title: 'Chi tiết bảng dữ liệu',
    },
  ];

  return (
    <>
      <div className="tera-page-form">
        <div className="page-header">
          <div className="p-3 page-header__breadcrumb">
            <div
              className="cursor-pointer page-header__breadcrumb-back"
              onClick={() => navigate(-1)}
            >
              <ArrowSmallLeftSolid width={24} height={24} />
            </div>
            <Breadcrumb separator={'>'} items={breadcrumbItem} />
          </div>

          <div className="flex justify-between page-header__function">
            <div className="flex gap-2.5">
              <Button
                type="danger"
                className="page-header-btn"
                onClick={() => handleDelete(tableId)}
              >
                Xóa
                <XMarkOutlined width={'1rem'} height={'1rem'} />
              </Button>
              <Button
                className="page-header-btn"
                onClick={() =>
                  setFormModel({ open: true, id: Number(tableId) })
                }
              >
                Sửa
                <PencilSquareOutlined width={'1rem'} height={'1rem'} />
              </Button>
            </div>
            <Dropdown
              menu={{
                items: itemsDropdown,
              }}
            >
              <Button
                type="alternative"
                icon={<AdjustmentsHorizontalOutlined />}
              />
            </Dropdown>
          </div>
        </div>
        <div className="p-5 bg-white shadow-xsm rounded-2xl">
          <CardForm title="THÔNG TIN BẢNG DỮ LIỆU" className="mb-10">
            <div className="grid  lg:grid-cols-3 gap-y-2.5 gap-x-4 lg:p-y-2.5 detail-responsive">
              {data.map((item, index) => {
                return (
                  <div
                    className={`flex ${'item' + (index + 1)}`}
                    key={item.key}
                  >
                    <h6 className=" text-gray-800 font-extrabold capitalize !min-w-[170px] !max-w-[170px]">
                      {item?.title}
                    </h6>
                    <p className="font-normal text-gray-800 capitalize break-words detail-value">
                      {item?.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardForm>
          <CardForm title="CẤU HÌNH CỘT DỮ LIỆU">
            <TableColumConfig tableId={tableId} isAdd />
          </CardForm>
        </div>
      </div>
      {formModel?.open && (
        <TableConfigForm
          pageId={Number(pageId)}
          open={formModel.open}
          id={formModel?.id}
          onClose={() => {
            setFormModel({ open: false });
          }}
          onChangeSuccess={() => {
            refetch();
            queryClient.invalidateQueries(['get-list-column-config']);
          }}
        />
      )}

      {openImport && (
        <ModalImport
          open={openImport}
          onOk={(val) => handleImport(val)}
          onCancel={() => setOpenImport(false)}
        />
      )}
    </>
  );
};
export default TableConfigDetail;
