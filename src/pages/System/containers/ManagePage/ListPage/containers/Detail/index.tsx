import CardForm from '_common/component/CardForm';
import {
  MANAGE_PAGE_CONFIG_FORM_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import useConfirm from '_common/hooks/useConfirm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  DocumentDuplicateOutlined,
  Dropdown,
  DropdownItem,
  EllipsisHorizontalOutlined,
  Icon,
  ItemType,
  PencilSquareOutlined,
  Spin,
  Tag,
  XMarkOutlined,
  downloadFile,
  notification,
} from 'tera-dls';
import ManagePageCopy from '../Copy';
import { useEffect, useState } from 'react';
import ManagePageApi from '../../_api';
import { messageError } from '_common/constants/message';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '_common/utils';
import ModalImport from '_common/component/ModalImport';
import { statusOnOffString } from '../../../constants';
import NoData from '_common/component/NoData';
import TableFormConfig from '../../../FormConfig/containers/Table';
import TableControlConfig from '../../../ControlConfig/container/Table';
import TableConfig from '../../../TableConfig/container/Table';
import ManagePageForm from '../Form';
import { ImportFile } from '_common/interface';
import moment from 'moment';

function ManagePageDetail() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { pageId } = useParams();
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isImport, setIsImport] = useState<boolean>(false);
  const [isForm, setIsForm] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const backList = () => {
    navigate(MANAGE_PAGE_URL.list.path);
  };

  const { data, refetch, isLoading, isError } = useQuery(
    ['get-detail-page'],
    () => ManagePageApi.getDetail(pageId),
    {
      enabled: !!pageId,
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
          backList();
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

  const { mutate: importExcel } = useMutation(
    (variable: any) => ManagePageApi.import(variable),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          setIsImport(false);
          queryClient.invalidateQueries(['get-list-control-config']);
          queryClient.invalidateQueries(['get-table-config-list']);
          queryClient.invalidateQueries(['list-form-config']);
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
    (params: any) => ManagePageApi.export(params),
    {
      onSuccess(res) {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          const date = moment().format('DDMMYYYY_HHmmss');
          downloadFile(res?.data?.src, `export_page_${date}`);
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

  const handleDeletePage = () => {
    confirm.warning({
      title: 'XÁC NHẬN XÓA TRANG',
      content: (
        <>
          <p>Bạn có chắc chắn muốn xóa trang</p>
          <div className="flex justify-center gap-x-1">
            <span className="truncate max-w-[200px]">{data?.name}</span>
            <span>này không?</span>
          </div>
        </>
      ),
      onOk: () => {
        deletePage(pageId);
      },
    });
  };

  const handleImport = (values: ImportFile) => {
    const params = {
      ...values,
      page_id: pageId,
    };
    importExcel(params);
  };

  const handleExport = () => {
    const params = {
      page_id: pageId,
    };
    exportExcel(params);
  };

  const dropdownItems: DropdownItem[] = [
    {
      key: 1,
      label: 'Export dữ liệu excel',
      onClick: () => handleExport(),
    },
    {
      key: 2,
      label: 'Import dữ liệu excel',
      onClick: () => setIsImport(true),
    },
    {
      key: 3,
      label: 'Cấu hình control',
      onClick: () =>
        navigate(`${MANAGE_PAGE_URL.controlConfig.path}/${pageId}`),
    },

    {
      key: 4,
      label: 'Cấu hình bảng dữ liệu',
      onClick: () => navigate(`${MANAGE_PAGE_URL.tableConfig.path}/${pageId}`),
    },
    {
      key: 5,
      label: 'Cấu hình form dữ liệu',
      onClick: () =>
        navigate(`${MANAGE_PAGE_CONFIG_FORM_URL.list.path}/${pageId}`),
    },
    {
      key: 6,
      label: 'Cấu hình tìm kiếm và lọc',
    },
    {
      key: 7,
      label: 'Danh sách nhóm',
    },
  ];

  const BreadcrumbItem: ItemType[] = [
    {
      title: (
        <a className="cursor-pointer" onClick={backList}>
          Danh sách trang
        </a>
      ),
    },
    {
      title: 'Chi tiết trang',
    },
  ];

  const renderDetail = () => {
    const details = [
      {
        title: 'Mã trang',
        value: data?.concatenated_code,
      },
      {
        title: 'Đường dẫn',
        value: data?.path,
      },
      {
        title: 'Người tạo',
        value: data?.created_by?.full_name,
      },
      {
        title: 'Tên trang',
        value: data?.name,
      },
      {
        title: 'Thứ tự đứng sau',
        value: data?.standing_behind === 0 ? '' : data?.standing_behind?.name,
      },
      {
        title: 'Ngày tạo',
        value: formatDate(data?.created_at, 'DD/MM/YYYY - HH:mm'),
      },
      {
        title: 'Tiêu đề',
        value: data?.title,
      },
      {
        title: 'Icon',
        value: data?.icon && <Icon type={data?.icon} />,
      },
      {
        title: 'Người cập nhật',
        value: data?.updated_by?.full_name,
      },
      {
        title: 'Menu cha',
        value: data?.parent_menu?.title,
      },
      {
        title: 'Business_id',
        value: data?.business_id,
      },
      {
        title: 'Ngày cập nhật',
        value:
          !!data?.updated_by &&
          formatDate(data?.updated_at, 'DD/MM/YYYY - HH:mm'),
      },
      {
        title: 'Trạng thái',
        value: (
          <Tag color={statusOnOffString[data?.status]?.color}>
            {statusOnOffString[data?.status]?.name}
          </Tag>
        ),
      },
    ];
    return details;
  };

  useEffect(() => {
    if (pageId) refetch();
  }, [pageId]);

  if (isError) return <NoData />;

  return (
    <Spin spinning={loadingDelete || isLoading}>
      <div className="tera-page-form">
        <div className="page-header">
          <div className="page-header__breadcrumb">
            <div
              className="cursor-pointer page-header__breadcrumb-back"
              onClick={() => navigate(-1)}
            >
              <ArrowSmallLeftSolid width={24} height={24} />
            </div>
            <Breadcrumb separator={'>'} items={BreadcrumbItem} />
          </div>

          <div className="page-header__function">
            <Button
              icon={<DocumentDuplicateOutlined />}
              className="page-header-btn"
              onClick={() => setIsCopy(true)}
            >
              Sao chép trang
            </Button>
            <Button
              icon={<XMarkOutlined />}
              type="danger"
              className="page-header-btn"
              onClick={handleDeletePage}
            >
              Xóa
            </Button>
            <Button
              className="page-header-btn"
              icon={<PencilSquareOutlined />}
              onClick={() => setIsForm(true)}
            >
              Sửa
            </Button>
            <Dropdown menu={{ items: dropdownItems }} trigger="click">
              <Button
                type="alternative"
                icon={<EllipsisHorizontalOutlined />}
                className="ml-auto"
              />
            </Dropdown>
          </div>
        </div>
        <div className="page-content">
          <CardForm title="THÔNG TIN TRANG">
            <div className="grid gap-y-2.5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {renderDetail().map((item, index) => {
                return (
                  <div className="flex" key={index}>
                    <h6 className="detail-key ">{item?.title}</h6>
                    <span className="detail-value">{item?.value}</span>
                  </div>
                );
              })}
            </div>
          </CardForm>
          <CardForm title="CẤU HÌNH CONTROL">
            <TableControlConfig pageId={+pageId} isAdd />
          </CardForm>
          <CardForm title="CẤU HÌNH BẢNG DỮ LIỆU">
            <TableConfig pageId={pageId} isAdd />
          </CardForm>
          <CardForm title="CẤU HÌNH FORM">
            <TableFormConfig isAdd />
          </CardForm>
        </div>
      </div>
      {isCopy && (
        <ManagePageCopy
          pageId={pageId}
          onClose={() => setIsCopy(false)}
          open={isCopy}
        />
      )}
      {isImport && (
        <ModalImport
          open={isImport}
          onOk={handleImport}
          onCancel={() => setIsImport(false)}
        />
      )}
      {isForm && (
        <ManagePageForm
          open={isForm}
          id={+pageId}
          onClose={() => {
            setIsForm(false);
          }}
          onChangeDataSuccess={() => {
            queryClient.removeQueries({
              queryKey: ['get-page-config-list'],
            });
            refetch();
            queryClient.invalidateQueries(['get-list-control-config']);
            queryClient.invalidateQueries(['get-table-config-list']);
            queryClient.invalidateQueries(['list-form-config']);
          }}
        />
      )}
    </Spin>
  );
}

export default ManagePageDetail;
