import { useMutation, useQueryClient } from '@tanstack/react-query';
import CountSelection from '_common/component/CountSelection';
import HeaderViewList from '_common/component/HeaderViewList';
import ModalImport from '_common/component/ModalImport';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import { MANAGE_PAGE_URL } from '_common/constants/url';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  DocumentDuplicateOutlined,
  DropdownItem,
  ItemType,
  downloadFile,
  notification,
  useDetectDevice,
} from 'tera-dls';
import { RequestImport } from '../interfaces';
import FormConfigApi from './_api';
import Header from './containers/Header';
import CopyForm from './containers/Modal/CopyForm';
import CreateConfigForm from './containers/Modal/CreateConfigForm';
import TableFormConfig from './containers/Table';
import useConfirm from '_common/hooks/useConfirm';

const FormConfig = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { pageId } = useParams();
  const queryClient = useQueryClient();
  const { isDesktop, isTablet } = useDetectDevice();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isOpenImport, setIsOpenImport] = useState<boolean>(false);
  const [isOpenCopyModal, setIsOpenCopyModal] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [listSelectedTitle, setListSelectedTitle] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const { mutate: mutateExport } = useMutation(
    () => {
      return FormConfigApi.export({
        id_selected: selectedRowKeys,
        page_id: pageId,
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
      return FormConfigApi.import(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          setIsOpenImport(false);
          notification.success({
            message: res?.msg,
          });
          queryClient.invalidateQueries(['list-form-config']);
        }
      },
      onError: (error: any) => {
        confirm.error({
          title: 'LỖI IMPORT DỮ LIỆU',
          content: (
            <ul className="list-disc">
              <p>Tổng số lỗi: {error?.data?.errors?.length}</p>
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
      title: 'Cấu hình form dữ liệu',
    },
  ];

  const dropdownConfig: DropdownItem[] = [
    {
      key: 'export',
      label: 'Export dữ liệu excel',
      onClick: () => mutateExport(),
    },
    {
      key: 'import',
      label: 'Import dữ liệu excel',
      onClick: () => setIsOpenImport(true),
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'copy',
      label: 'Sao chép form dữ liệu',
      onClick: () => setIsOpenCopyModal(true),
    },
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => {
        confirm.warning({
          title: 'Xác nhận xoá cấu hình form dữ liệu',
          onOk: () => {
            // mutateDelete(dataRecord?.id);
            console.log('list item cần xoá', selectedRowKeys);
          },
          content: (
            <>
              <p>Bạn có chắc muốn xoá cấu hình các form dữ liệu </p>
              <p>
                {listSelectedTitle.map((title) => (
                  <span className="font-bold">{title}, </span>
                ))}
                này không?
              </p>
            </>
          ),
        });
      },
    },
  ];

  const closeModalCreate = () => {
    setIsOpenForm(false);
  };
  const closeModalCopy = () => {
    setIsOpenCopyModal(false);
  };

  const handleSearch = (value) => {
    setKeyword(value?.keyword);
  };

  const handleSelectRow = (data: number[]) => {
    setSelectedRowKeys(data);
  };

  const handleImportDataForm = (data: any) => {
    const convertData = {
      ...data,
      page_id: Number(pageId),
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
        buttonCreatingKey={BUTTON_KEY.MANAGE_PAGE_CONFIG_FORM_CREATE}
      >
        {isDesktop && (
          <Button
            onClick={() => {
              setIsOpenCopyModal(true);
            }}
            className="rounded-xsm"
          >
            <div className="flex items-center gap-1 shrink-0">
              <DocumentDuplicateOutlined className="w-5 h-5" />
              <span>Sao chép form dữ liệu</span>
            </div>
          </Button>
        )}
        <Header
          onSearch={handleSearch}
          title="Tìm kiếm theo mã form, tiêu đề"
        />
      </HeaderViewList>
      <CountSelection count={selectedRowKeys.length} />
      <TableFormConfig
        rowSelection={{
          onChange: (key: number[], listItem) => {
            const listTitle = listItem.map((item: any) => item?.title);
            setListSelectedTitle(listTitle);
            handleSelectRow(key);
          },
        }}
        paramsKeyword={keyword}
      />
      {isOpenForm && (
        <CreateConfigForm
          isOpen={isOpenForm}
          id={null}
          handleClose={closeModalCreate}
        />
      )}
      {isOpenCopyModal && (
        <CopyForm isOpen={isOpenCopyModal} handleClose={closeModalCopy} />
      )}
      {isOpenImport && (
        <ModalImport
          open={isOpenImport}
          onCancel={() => setIsOpenImport(false)}
          onOk={(value) => handleImportDataForm(value)}
        />
      )}
    </>
  );
};

export default FormConfig;
