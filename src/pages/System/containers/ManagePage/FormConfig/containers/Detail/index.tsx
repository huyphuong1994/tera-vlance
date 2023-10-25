import { useMutation, useQueries } from '@tanstack/react-query';
import CardForm from '_common/component/CardForm';
import HeaderViewList from '_common/component/HeaderViewList';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import {
  MANAGE_PAGE_CONFIG_FORM_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import useConfirm from '_common/hooks/useConfirm';
import { statusConfigColor } from 'pages/System/constants';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  Col,
  Description,
  DropdownItem,
  ItemType,
  PencilSquareOutlined,
  Row,
  Spin,
  Tag,
  XMarkOutlined,
  notification,
} from 'tera-dls';
import FormConfigApi from '../../_api';
import TableFieldConfig from '../FieldConfig/Table';
import CopyForm from '../Modal/CopyForm';
import CreateConfigForm from '../Modal/CreateConfigForm';
// import { Breadcrumb } from "tera-dls";

const infoConfigFormColumn = [
  {
    key: 'code',
    value: '',
    name: 'Mã form dữ liệu',
  },
  {
    key: 'layout',
    value: '',
    name: 'Layout',
  },
  {
    key: 'created_by',
    value: '',
    name: 'Người tạo',
  },
  {
    key: 'title',
    value: '',
    name: 'Tiêu đề',
  },
  {
    key: 'className',
    value: '',
    name: 'ClassName',
  },
  {
    key: 'created_at',
    value: '',
    name: 'Ngày tạo',
  },
  {
    key: 'group',
    value: '',
    name: 'Nhóm form dữ liệu',
  },
  {
    key: 'priority',
    value: '',
    name: 'Thứ tự đứng sau',
  },
  {
    key: 'updated_by',
    value: '',
    name: 'Người cập nhật',
  },
  {
    key: 'status',
    value: '',
    name: 'Trạng thái',
  },
  {
    key: 'numOfColumn',
    value: '',
    name: 'Số lượng cột',
  },
  {
    key: 'updated_at',
    value: '',
    name: 'Ngày cập nhật',
  },
];

const FormConfigDetail = () => {
  const [isOpenCopyModal, setIsOpenCopyModal] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { formId, pageId } = useParams();

  const [{ data: detailFormConfig, isLoading, refetch }] = useQueries({
    queries: [
      {
        queryKey: ['detail_form_config'],
        queryFn: () => {
          return FormConfigApi.getDetail(formId);
        },
      },
    ],
  });

  const { mutate: mutateDelete } = useMutation(
    (variables: any) => {
      return FormConfigApi.delete(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          navigate(`${MANAGE_PAGE_CONFIG_FORM_URL.list.path}/${pageId}`);
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

  const infoConfigForm = useMemo(() => {
    const convertData = {
      code: detailFormConfig?.code,
      layout: detailFormConfig?.layout,
      created_by: detailFormConfig?.employee_created?.full_name,
      title: detailFormConfig?.title,
      className: detailFormConfig?.class_name,
      created_at: detailFormConfig?.created_at_format,
      group: detailFormConfig?.group_form_control?.title,
      priority: detailFormConfig?.item_prev_order?.title,
      updated_by: detailFormConfig?.employee_updated?.full_name,
      status: {
        key: detailFormConfig?.status,
        text: detailFormConfig?.status_text,
      },
      numOfColumn: detailFormConfig?.column,
      updated_at: detailFormConfig?.employee_updated
        ? detailFormConfig?.updated_at_format
        : '',
    };
    const dataRender = infoConfigFormColumn.map((info) => ({
      ...info,
      value: convertData ? convertData[info?.key] : '',
    }));

    return dataRender;
  }, [detailFormConfig]);

  const dropdownConfig: DropdownItem[] = [
    {
      key: 1,
      label: <a>Export dữ liệu excel</a>,
    },
    {
      key: 2,
      label: <a>Import dữ liệu excel</a>,
    },
  ];

  const BreadcrumbItem: ItemType[] = [
    {
      title: (
        <a
          className="cursor-pointer"
          onClick={() => navigate(MANAGE_PAGE_URL.list.path)}
        >
          Danh sách trang
        </a>
      ),
    },
    {
      title: (
        <a
          className="cursor-pointer"
          onClick={() =>
            navigate(`${MANAGE_PAGE_CONFIG_FORM_URL.list.path}/${pageId}`)
          }
        >
          Cấu hình form dữ liệu
        </a>
      ),
    },
    {
      title: 'Chi tiết form dữ liệu',
    },
  ];

  const handleDeleteForm = () => {
    confirm.warning({
      title: 'Xác nhận xoá cấu hình form dữ liệu',
      onOk: () => {
        mutateDelete(formId);
      },
      content: (
        <>
          <p>Bạn có chắc muốn xoá cấu hình form dữ liệu </p>
          <p>
            <span className="font-bold">{detailFormConfig?.title}</span> này
            không?
          </p>
        </>
      ),
    });
  };

  const onEdit = () => {
    setIsOpenEdit(true);
  };

  const closeModalCopy = () => {
    setIsOpenCopyModal(false);
  };
  const closeModalEdit = () => {
    refetch();
    setIsOpenEdit(false);
  };

  return (
    <>
      <Spin spinning={isLoading}>
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
          isDetail
          buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_CONFIG_FORM_CREATE}
          dropdownConfig={dropdownConfig}
        >
          <Button
            type="danger"
            className="page-header-btn"
            onClick={handleDeleteForm}
          >
            <div className="flex items-center gap-1">
              <span>Xoá</span>
              <XMarkOutlined className="w-5 h-5" />
            </div>
          </Button>
          <Button onClick={() => onEdit()} className="page-header-btn">
            <span>Sửa</span>
            <PencilSquareOutlined className="w-5 h-5" />
          </Button>
        </HeaderViewList>
        <div className="bg-white shadow-xsm rounded-2xl p-5">
          <CardForm title="THÔNG TIN FORM DỮ LIỆU">
            <Row className="lg:grid-cols-3 md:grid-cols-2 gap-0">
              {infoConfigForm.map((info) => (
                <Col>
                  <Description
                    className="lg:grid-cols-3 md:grid-cols-2"
                    label={info.name}
                  >
                    {info.key === 'status' ? (
                      <Tag color={statusConfigColor[info.value?.key]}>
                        {info.value?.text}
                      </Tag>
                    ) : (
                      info.value
                    )}
                  </Description>
                </Col>
              ))}
            </Row>
          </CardForm>
          <CardForm title="CẤU HÌNH TRƯỜNG DỮ LIỆU" className="pt-10">
            <TableFieldConfig isAdd />
          </CardForm>
        </div>
      </Spin>
      {isOpenEdit && (
        <CreateConfigForm
          isOpen={isOpenEdit}
          id={detailFormConfig?.id}
          handleClose={closeModalEdit}
        />
      )}
      {isOpenCopyModal && (
        <CopyForm isOpen={isOpenCopyModal} handleClose={closeModalCopy} />
      )}
    </>
  );
};

export default FormConfigDetail;
