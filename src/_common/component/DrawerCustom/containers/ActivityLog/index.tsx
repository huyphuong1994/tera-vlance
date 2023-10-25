import React, { useEffect, useMemo, useState } from 'react';
import ActivityLogApi from '../../_api/activityLog';
import { useQuery } from '@tanstack/react-query';
import { Pagination, Spin } from 'tera-dls';
import _ from 'lodash';
import moment from 'moment';
import NoData from '_common/component/NoData';
import ActivityLogItem from './Item';

function ActivityLog({ object_type, object_id }) {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
  });
  const { data, refetch, isLoading } = useQuery(
    [object_type, object_id, 'list-activity'],
    () =>
      ActivityLogApi.getList({
        params: {
          page: pagination.currentPage,
          limit: pagination.limit,
          object_id: object_id,
          object_type: object_type,
        },
      }),
    {
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const handleChangePagination = (page, pageSize) => {
    setPagination({
      ...pagination,
      currentPage: page,
      limit: pageSize,
    });
  };

  const renderList = useMemo(() => {
    if (!data) return <NoData />;
    const groupDate = _.groupBy(data.data, (item) =>
      moment(item?.created_at).format('DD/MM/YYYY'),
    );

    return Object.keys(groupDate)?.map((group) => (
      <div key={group}>
        <h3 className="text-gray-700 flex items-center gap-x-3">
          <span>{group}</span>
          <div className="w-full h-[1px] bg-gray-500"></div>
        </h3>
        {groupDate[group].map((item, index) => (
          <ActivityLogItem item={item} key={index} />
        ))}
      </div>
    ));
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pagination.currentPage, pagination.limit]);

  return (
    <>
      <h2 className="font-semibold text-lg text-gray-700">Lịch sử hoạt động</h2>
      <Spin spinning={isLoading}>
        <div className="flex flex-col gap-y-2 py-5">{renderList}</div>
      </Spin>
      {data && (
        <Pagination
          current={data?.current_page}
          onChange={handleChangePagination}
          total={data?.total}
        />
      )}
    </>
  );
}

export default ActivityLog;
