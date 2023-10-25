import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import CommentApi from '../../_api/comment';
import { Pagination, Spin, notification } from 'tera-dls';

import { messageError } from '_common/constants/message';
import ListComment from './ListComment';
import FormComment, { FormCommentFunctionProps } from './FormComment';

function Comment({ object_type, object_id }) {
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 10 });

  const formRef = useRef<FormCommentFunctionProps>(null);

  const {
    data,
    refetch,
    isLoading: loadingComments,
  } = useQuery(
    ['list-comment', object_type, object_id],
    () =>
      CommentApi.getList({
        params: {
          page: pagination.currentPage,
          limit: pagination.limit,
          object_id: 25,
          object_type: object_type,
        },
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const { mutate, isLoading } = useMutation(
    (variables: any) => CommentApi.create({ params: variables }),
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          notification.success({
            message: res?.msg,
          });
          formRef?.current?.reset();
          refetch();
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

  const handleSubmitForm = (value) => {
    const variable = {
      content: value?.content,
      object_id: object_id,
      file_upload: value?.file_upload,
    };
    mutate(variable);
  };

  const handleChangePagination = (page, pageSize) => {
    setPagination({
      ...pagination,
      currentPage: page,
      limit: pageSize,
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-lg text-gray-700">Thảo luận</h2>
      <FormComment
        onSubmit={handleSubmitForm}
        propsButtonSend={{ loading: isLoading }}
        ref={formRef}
      />

      <div className="flex flex-col gap-y-1 mt-4">
        <Spin spinning={loadingComments}>
          <ListComment data={data} />
        </Spin>
        {data && (
          <Pagination
            current={data?.current_page}
            onChange={handleChangePagination}
            total={data?.total}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
