import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import AttachmentApi from '../../_api/attachment';
import UploadFile from './UploadFile';
import { IFileUpload } from '_common/interface';
import NoData from '_common/component/NoData';
import { Spin } from 'tera-dls';

function Attachment({ object_type, object_id }) {
  const [listFile, setListFile] = useState<IFileUpload[]>([]);
  const { data, isLoading, isError } = useQuery(
    [object_type, object_id, 'list-attachment'],
    () =>
      AttachmentApi.getList({
        params: {
          page: 1,
          limit: 10,
          object_id: 1,
          object_type: '',
        },
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const handleReceiveImages = (file, listFile) => {
    setListFile(listFile);
  };

  useEffect(() => {
    if (data) {
      const files = data?.data?.map((file) => ({
        name: file?.file_name,
        url: file?.file_url,
        id: file?.id,
      }));
      setListFile(files);
    }
  }, [data]);

  if (isError) return <NoData />;

  return (
    <>
      <h1 className="font-semibold text-lg text-gray-700">Tệp đính kèm</h1>
      <Spin spinning={isLoading}>
        <UploadFile
          fileList={listFile}
          folder="attachment"
          object_key={object_id}
          object_id={object_id}
          onReceiveFiles={(file, listFile) =>
            handleReceiveImages(file, listFile)
          }
          onRemove={(fileDelete) => {
            const newList = listFile.filter(
              (file) => file.id !== fileDelete?.id,
            );
            setListFile(newList);
          }}
        />
      </Spin>
    </>
  );
}

export default Attachment;
