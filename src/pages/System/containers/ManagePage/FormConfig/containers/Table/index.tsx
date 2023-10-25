import { useMutation, useQuery } from '@tanstack/react-query';
import PaginationCustom from '_common/component/PaginationCustom';
import ActionDropdown from '_common/component/TableColumnCustom/ActionDropdown';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import useConfirm from '_common/hooks/useConfirm';
import { usePermission } from '_common/hooks/usePermission';
import { IPagination } from '_common/interface';
import { mergeField, removeKeyFromObject } from '_common/utils';
import { statusConfigColor } from 'pages/System/constants';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DropdownItem,
  PaginationProps,
  PlusCircleOutlined,
  Table,
  TableProps,
  Tag,
  Tooltip,
  notification,
} from 'tera-dls';
import FormConfigApi from '../../_api';
import { IParamsList } from '../../interfaces';
import CreateConfigForm from '../Modal/CreateConfigForm';

interface ITableFormConfig extends TableProps {
  paramsKeyword?: string;
  isAdd?: boolean;
}

const TableFormConfig = ({
  isAdd = false,
  paramsKeyword,
  ...props
}: ITableFormConfig) => {
  const { hasPage } = usePermission();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [itemClick, setItemClick] = useState<any>(null);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
  });
  const {
    data: listData,
    refetch: getListData,
    isLoading,
  } = useQuery(
    ['list-form-config', pageId],
    () => {
      const mergeParams: IParamsList = mergeField(
        {
          keyword: paramsKeyword,
          page_id: pageId,
        },
        pagination,
      );
      return FormConfigApi.getList(mergeParams);
    },
    {
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const metaData = useMemo(() => {
    const temp = removeKeyFromObject(listData, 'data');
    return temp;
  }, [listData]);

  const { mutate: mutateDelete } = useMutation(
    (variables: any) => {
      return FormConfigApi.delete(variables);
    },
    {
      onSuccess: ({ code, msg }) => {
        if (code === 200) {
          getListData();
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

  const buttonKey = {
    update: BUTTON_KEY.MANAGE_PAGE_CONFIG_FORM_UPDATE,
    detail: BUTTON_KEY.MANAGE_PAGE_CONFIG_FORM_DETAIL,
    delete: BUTTON_KEY.MANAGE_PAGE_CONFIG_FORM_DELETE,
    configField: BUTTON_KEY.MANAGE_PAGE_CONFIG_FIELD,
  };

  const onConfigField = (idForm: number) => {
    navigate(`/system/manage-page/${pageId}/config-field/${idForm}`);
  };

  const onDetail = (idForm: number) => {
    navigate(`/system/manage-page/config-form/${pageId}/detail/${idForm}`);
  };

  const onEdit = (dataRecord: any) => {
    setItemClick(dataRecord);
    setIsOpenEdit(true);
  };

  const onDelete = (dataRecord: any) => {
    confirm.warning({
      title: 'Xác nhận xoá cấu hình form dữ liệu',
      onOk: () => {
        mutateDelete(dataRecord?.id);
      },
      content: (
        <>
          <p>Bạn có chắc muốn xoá cấu hình form dữ liệu </p>
          <p>
            <span className="font-bold">{dataRecord?.title}</span> này không?
          </p>
        </>
      ),
    });
  };

  const closeModalEdit = () => {
    setIsOpenEdit(false);
    setItemClick(null);
  };

  const handleChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    // const paramString = updateQueryParams({
    //   currentPage: String(page),
    //   currentLimit: String(pageSize),
    // });
    // insertUrlParam(paramString);
    setPagination({
      ...pagination,
      page: page,
      limit: pageSize,
    });
  };

  const dropdownItems = (item: any): DropdownItem[] => {
    const dropdownItems: DropdownItem[] = [
      hasPage(buttonKey.configField) && {
        key: 1,
        label: (
          <a onClick={() => onConfigField(item?.id)}>Cấu hình trường dữ liệu</a>
        ),
      },
      hasPage(buttonKey.update) && {
        key: 2,
        label: <a onClick={() => onEdit(item)}>Sửa</a>,
      },
      hasPage(buttonKey.delete) && {
        key: 3,
        label: (
          <a className="text-red-600" onClick={() => onDelete(item)}>
            Xoá
          </a>
        ),
      },
    ];
    return dropdownItems;
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'record_number',
      key: 'record_number',
      width: '6%',
      align: 'center',
    },
    {
      title: 'Mã form dữ liệu',
      dataIndex: 'code',
      key: 'code',
      width: '16%',
    },
    {
      title: 'Tiêu đề',
      key: 'title',
      dataIndex: 'title',
      width: '16%',
    },
    {
      title: 'Nhóm form dữ liệu',
      key: 'group_form_control',
      dataIndex: 'group_form_control',
      width: '16%',
      render: (record) => record?.title,
    },
    {
      title: 'Layout',
      key: 'layout_text',
      dataIndex: 'layout_text',
      width: '16%',
    },
    {
      title: 'ClassName',
      key: 'class_name',
      dataIndex: 'class_name',
      width: '16%',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '7%',
      render: (item, record) => {
        return (
          <Tag className="w-fit" color={statusConfigColor[item]}>
            {record?.status_text}
          </Tag>
        );
      },
    },
    {
      // && hasPage(buttonKey.create)
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
      width: 116,
      fixed: 'right',
      render: (record: any) => {
        return (
          <ActionDropdown
            onClickDetail={() => onDetail(record?.id)}
            dropdownItems={dropdownItems(record)}
            trigger="click"
            buttonDetailKey={buttonKey.detail}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (paramsKeyword || pagination) {
      getListData();
    }
  }, [paramsKeyword, pagination]);

  return (
    <>
      <div className="bg-white h-full shadow-xsm rounded-2xl">
        <Table
          columns={columns}
          data={listData?.data}
          loading={isLoading}
          scroll={{ x: 1500, y: '100%' }}
          className="h-full"
          {...props}
        />
        {metaData?.total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            total={metaData?.total || 0}
            current={metaData?.current_page || 1}
            pageSize={metaData?.per_page || 10}
            to={metaData?.to}
            from={metaData?.from}
          />
        )}
      </div>
      {isOpenEdit && (
        <CreateConfigForm
          isOpen={isOpenEdit}
          id={itemClick?.id}
          handleClose={closeModalEdit}
        />
      )}
    </>
  );
};

export default TableFormConfig;
