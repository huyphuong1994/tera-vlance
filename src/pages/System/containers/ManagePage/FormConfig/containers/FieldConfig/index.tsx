import { useMutation, useQueryClient } from '@tanstack/react-query';
import CountSelection from '_common/component/CountSelection';
import HeaderViewList from '_common/component/HeaderViewList';
import ModalImport from '_common/component/ModalImport';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import {
  MANAGE_PAGE_CONFIG_FORM_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  DropdownItem,
  ItemType,
  downloadFile,
  notification,
  useDetectDevice,
} from 'tera-dls';
import { RequestImport } from '../../../interfaces';
import { FieldConfigApi } from '../../_api';
import Header from '../Header';
import CreateConfigField from './Modal/CreateConfigField';
import TableFieldConfig from './Table';
import useConfirm from '_common/hooks/useConfirm';

const FieldConfig = () => {
  const navigate = useNavigate();
  const { pageId, formId } = useParams();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { isTablet } = useDetectDevice();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenImport, setIsOpenImport] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const { mutate: mutateExport } = useMutation(
    () => {
      return FieldConfigApi.export({
        form_id: formId,
        id_selected: selectedRowKeys,
      });
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          downloadFile(res?.data?.src);
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

  const { mutate: mutateImport } = useMutation(
    (variables: RequestImport) => {
      return FieldConfigApi.import(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          setIsOpenImport(false);
          notification.success({
            message: res?.msg,
          });
          queryClient.invalidateQueries(['list-field-config']);
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
          okButtonProps: {
            className: 'hidden',
          },
          cancelText: 'Đóng',
          align: 'left',
        });
      },
    },
  );

  const dropdownConfig: DropdownItem[] = [
    {
      key: 1,
      label: 'Export dữ liệu excel',
      onClick: () => mutateExport(),
      // disabled: selectedRowKeys?.length === 0,
    },
    {
      key: 2,
      label: 'Import dữ liệu excel',
      onClick: () => setIsOpenImport(true),
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => setIsOpenImport(true),
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
      title: 'Cấu hình trường dữ liệu',
    },
  ];

  const closeModalCreate = () => {
    setIsOpenForm(false);
  };

  const handleSearch = (value) => {
    setKeyword(value?.keyword);
  };

  const handleSelectRow = (data: number[]) => {
    setSelectedRowKeys(data);
  };

  const handleImportDataField = (data: any) => {
    const convertData = {
      ...data,
      form_id: Number(formId),
    };
    mutateImport(convertData);
  };

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
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_CONFIG_FIELD_CREATE}
      >
        <Header
          onSearch={handleSearch}
          title="Tìm kiếm theo mã trường dữ liệu, tiêu đề"
        />
      </HeaderViewList>
      <CountSelection count={selectedRowKeys.length} />
      <TableFieldConfig
        rowSelection={{
          onChange: (key: number[]) => {
            handleSelectRow(key);
          },
        }}
        paramsKeyword={keyword}
      />
      {isOpenForm && (
        <CreateConfigField
          isOpen={isOpenForm}
          id={null}
          handleClose={closeModalCreate}
        />
      )}
      {isOpenImport && (
        <ModalImport
          open={isOpenImport}
          onCancel={() => setIsOpenImport(false)}
          onOk={(value) => handleImportDataField(value)}
        />
      )}
    </>
  );
};

export default FieldConfig;
