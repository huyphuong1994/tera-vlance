import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CountSelection from '_common/component/CountSelection';
import HeaderViewList from '_common/component/HeaderViewList';
import ModalImport from '_common/component/ModalImport';
import { messageError } from '_common/constants/message';
import { BUTTON_KEY } from '_common/constants/permission';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  Breadcrumb,
  Button,
  DocumentDuplicateOutlined,
  DropdownItem,
  Form,
  FormItem,
  MagnifyingGlassOutlined,
  Search,
  downloadFile,
  notification,
  useDetectDevice,
} from 'tera-dls';
import * as yup from 'yup';
import ControlConfigApi from './_api';
import CopyControlConfig from './container/Copy';
import FormControlConfig from './container/Form';
import TableControlConfig from './container/Table';
import { RequestImport } from '../interfaces';
import useConfirm from '_common/hooks/useConfirm';
import moment from 'moment';
const schema = yup.object().shape({
  keyword: yup.string().nullable(),
});
const ControlConfig = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const confirm = useConfirm();
  const { pageId } = useParams();
  const convertPageId = Number(pageId);
  const queryClient = useQueryClient();
  const { isDesktop, isTablet } = useDetectDevice();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>();
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [openImport, setOpenImport] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const [keyword, setKeyword] = useState<string>();

  const navigate = useNavigate();
  const handleSearch = (value: { keyword: string }) => {
    if (isDirty) {
      setKeyword(value.keyword);
    }
  };

  const handleOpenAddForm = () => {
    setOpenAddForm(true);
  };
  const onCloseAddForm = () => {
    setOpenAddForm(false);
  };

  const onCloseImport = () => {
    setOpenImport(false);
  };

  const { mutate: mutateExport } = useMutation(
    () => {
      return ControlConfigApi.export({
        page_id: convertPageId,
        id_selected: selectedRowKeys,
      });
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          const date = moment().format('DDMMYYYY_HHmmss');
          downloadFile(res?.data?.src, `export_control_${date}`);
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
      return ControlConfigApi.import(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          onCloseImport();
          queryClient.invalidateQueries(['get-list-control-config']);
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

  const dropdownItemsConfig: DropdownItem[] = [
    {
      label: 'Export dữ liệu excel',
      key: 'export',
      onClick: () => mutateExport(),
    },
    {
      label: 'Import dữ liệu excel',
      key: 'import',
      onClick: () => setOpenImport(true),
    },
  ];

  const dropdownMore: DropdownItem[] = [
    {
      key: 'copy',
      label: 'Sao chép form dữ liệu',
      onClick: () => setOpenCopy(true),
    },
    {
      key: 'delete',
      label: <p className="text-[red]">Xoá</p>,
      onClick: () => setOpenImport(true),
    },
  ];

  const handleImport = (values) => {
    mutateImport({
      overwrite: values.overwrite,
      file: values?.file,
      page_id: convertPageId,
    });
  };
  const onCloseCopyForm = () => setOpenCopy(false);
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
                    title: <a onClick={() => navigate(-1)}>Danh sách trang</a>,
                  },
                  {
                    title: 'Cấu hình control',
                  },
                ]}
              />
            </div>
          </>
        }
        onClickButtonAdd={() => handleOpenAddForm()}
        buttonCreatingKey={BUTTON_KEY.CONTROL_CONFIG_LIST_CREATE}
        dropdownConfig={dropdownItemsConfig}
        dropdownMore={isTablet ? dropdownMore : undefined}
      >
        {isDesktop && (
          <Button
            className="rounded-xsm mr-2.5 flex text-base items-center gap-2.5"
            onClick={() => setOpenCopy(true)}
          >
            <DocumentDuplicateOutlined className="w-4 h-4" />
            <span className="font-normal"> Sao chép control</span>
          </Button>
        )}

        <Form
          onSubmit={handleSubmit(handleSearch)}
          className="sm:w-full md:w-full lg:w-[400px]"
        >
          <FormItem className="mb-0">
            <Search
              placeholder="Tìm kiếm theo mã control, tiêu đề"
              icon={<MagnifyingGlassOutlined />}
              {...register('keyword')}
              className="w-full h-10"
            />
          </FormItem>
        </Form>
      </HeaderViewList>
      <CountSelection count={selectedRowKeys?.length} />
      <TableControlConfig
        pageId={convertPageId}
        keyword={keyword}
        tableProps={{
          rowSelection: {
            onChange: (selectedRowKeys: number[]) =>
              setSelectedRowKeys(selectedRowKeys),
          },
        }}
      />
      {openCopy && (
        <CopyControlConfig
          onClose={onCloseCopyForm}
          open={openCopy}
          pageId={convertPageId}
        />
      )}
      {openAddForm && (
        <FormControlConfig
          pageId={convertPageId}
          onClose={onCloseAddForm}
          open={openAddForm}
        />
      )}
      {openImport && (
        <ModalImport
          open={openImport}
          onCancel={onCloseImport}
          onOk={handleImport}
        />
      )}
    </>
  );
};

export default ControlConfig;
