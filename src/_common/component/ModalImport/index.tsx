import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactComponent as IconCloud } from 'styles/images/Icons/cloud-arrow-up.svg';
import {
  Button,
  Checkbox,
  CloudArrowUpOutlined,
  Form,
  FormItem,
  Modal,
} from 'tera-dls';
import * as yup from 'yup';
import UploadFiles from '../UploadFiles';
import Item from './Item';
import { ImportFile } from '_common/interface';

const schema = yup.object().shape({
  overwrite: yup.boolean(),
  file: yup.string().required('Chưa có file đính kèm'),
});

interface ModalImportProps {
  open: boolean;
  title?: string;
  fileSample?: string;
  onOk: (values: ImportFile) => void;
  onCancel: () => void;
}

function ModalImport({
  open,
  title = 'Import dữ liệu',
  fileSample,
  onOk,
  onCancel,
}: ModalImportProps) {
  const [file, setFile] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportFile>({
    resolver: yupResolver<ImportFile>(schema),
  });

  const handleSubmitForm = (values: ImportFile) => {
    onOk(values);
  };

  const handleProgressUpdate = (percent, fileInfo) => {
    const fileUpload = {
      name: fileInfo.name,
      size: fileInfo.size,
      percent,
    };
    setFile(fileUpload);
  };

  const handleReceiveFiles = (file) => {
    setValue('file', file?.url, { shouldValidate: true });
  };

  const handleRemove = () => {
    setFile(null);
    setValue('file', null);
  };

  return (
    <Modal
      open={open}
      title={title}
      closeIcon={false}
      okText="Đồng ý"
      cancelText="Hủy"
      className="modal-confirm md:w-[700px] w-full"
      onOk={() => handleSubmit(handleSubmitForm)()}
      onCancel={onCancel}
    >
      <Form className="flex flex-col gap-y-2.5">
        {fileSample && (
          <a className="text-green-400">
            Tải xuống file mẫu cho Import dữ liệu
          </a>
        )}

        <FormItem
          className="mb-0"
          messages={errors?.file?.message?.toString()}
          isError={!!errors?.file}
        >
          <div className="flex flex-col gap-y-5 p-5 pt-0 items-center bg-gray-50 rounded-2xl border border-gray-200">
            <IconCloud />
            <p className="text-gray-800 font-medium">CHỌN FILE CẦN TẢI LÊN</p>
            <div className="text-center text-gray-800">
              <p>[Chỉ hỗ trợ định dạng xls, xlsx và csv]</p>
              <p>Kích thước tệp tải lên tối đa là 5MB.</p>
            </div>
            <UploadFiles
              object_key="import"
              object_id="import"
              folder="import"
              fileList={file}
              multiple
              accept=".xlsx, .xls, .csv"
              isSingle
              isView={false}
              maxSize={5}
              onProgressUpdate={handleProgressUpdate}
              onReceiveFiles={handleReceiveFiles}
            >
              <Button htmlType="button">
                <CloudArrowUpOutlined className="w-5 h-5" />
                Tải lên
              </Button>
            </UploadFiles>
          </div>
        </FormItem>
        {file && <Item file={file} onRemove={handleRemove} />}
        <Checkbox {...register('overwrite')}>
          <span className="font-normal">
            Ghi đè lên dữ liệu nếu trùng mã dữ liệu
          </span>
        </Checkbox>
      </Form>
    </Modal>
  );
}

export default ModalImport;
