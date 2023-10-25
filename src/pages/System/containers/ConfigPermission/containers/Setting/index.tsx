import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { messageError } from '_common/constants/message';
import { isEqual, uniqWith } from 'lodash';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowSmallLeftSolid,
  BookmarkOutlined,
  Breadcrumb,
  Button,
  Checkbox,
  ChevronDownOutlined,
  Col,
  Collapse,
  ItemCollapseType,
  ItemType,
  Row,
  TabItemType,
  Tabs,
  notification,
  updateToggleObjectInArr,
} from 'tera-dls';
import ConfigPermissionApi from '../../_api';
import { RequestSetting } from '../../interfaces';

const SettingConfigPermission = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const convertId = Number(id);
  const { state } = useLocation();

  const [
    { data: listDefaultConfigControl, isFetching },
    { data: listRoleHasPermission },
  ] = useQueries({
    queries: [
      {
        queryKey: ['get-role-config-control'],
        queryFn: () => ConfigPermissionApi.getListConfigControl(),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['get-role-has-permission', convertId],
        queryFn: () => ConfigPermissionApi.getListRoleHasPermission(convertId),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [listPage, setListPage] = useState([]);
  const [selectedControlId, setSelectedControlId] = useState<number[]>([]);

  const { mutate: mutateSettingPermission, isLoading } = useMutation(
    (variables: RequestSetting) => {
      return ConfigPermissionApi.setting(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          queryClient.invalidateQueries(['get-role-config-control']);
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({ message: errorMessage });
      },
    },
  );

  const setDefaultListPage = () => {
    if (listDefaultConfigControl) {
      setListPage(listDefaultConfigControl?.[0]?.page_views);
    }
  };

  const setDefaultSelectedControlId = () => {
    if (listRoleHasPermission)
      setSelectedControlId(
        listRoleHasPermission.map((item) => item.permission_id),
      );
  };

  useEffect(() => setDefaultSelectedControlId(), [listRoleHasPermission]);

  useEffect(() => {
    setDefaultListPage();
  }, [listDefaultConfigControl]);

  const listTab: TabItemType[] = useMemo(
    () =>
      listDefaultConfigControl?.map((item) => ({
        key: item.key,
        label: item.title,
      })),
    [listDefaultConfigControl],
  );

  const handleChangeTab = (activeKey: string) => {
    const dataPage = listDefaultConfigControl.find(
      (item) => item.key === activeKey,
    );
    setListPage(dataPage.page_views);
  };

  const BreadcrumbItem: ItemType[] = [
    {
      title: <a onClick={() => navigate(-1)}>Danh sách quyền</a>,
    },
    {
      title: `Cấu hình quyền: ${state?.titlePermission}`,
    },
  ];

  const listCheckboxNode = useMemo(
    () => (listControl: any[]) => {
      const listPermissionId = listControl.map((item) => item.id);
      const checkedCurrentAll = listPermissionId.every((id) =>
        selectedControlId.includes(id),
      );

      const triggerSingleCheckbox = (item) => {
        const indexItem = selectedControlId.findIndex((id) => id === item.id);
        setSelectedControlId(
          updateToggleObjectInArr(indexItem, item.id, selectedControlId),
        );
      };

      const onCheckAll = (
        e: ChangeEvent<HTMLInputElement>,
        listControl: number[],
      ) => {
        e.target.checked
          ? setSelectedControlId(
              uniqWith([...selectedControlId, ...listControl], isEqual),
            )
          : setSelectedControlId(
              [...selectedControlId].filter(
                (item) => !listControl.includes(item),
              ),
            );
      };

      if (!listControl.length) return null;
      return (
        <Row className="grid-cols-12 gap-0 gap-y-5">
          <Col className="col-span-2">
            <Checkbox
              labelClassName="truncate"
              checked={!!listControl.length && checkedCurrentAll}
              onChange={(e) =>
                onCheckAll(
                  e,
                  listControl.map((item) => item.id),
                )
              }
            >
              Tất cả
            </Checkbox>
          </Col>
          <Col className="col-span-10">
            <Row className="grid-cols-4">
              {listControl.map((item) => {
                if (item.status === 'inactive') return null;
                return (
                  <Col key={item.id}>
                    <Checkbox
                      checked={selectedControlId.includes(item.id)}
                      labelClassName="truncate"
                      onChange={() => triggerSingleCheckbox(item)}
                    >
                      {item.title}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      );
    },
    [selectedControlId, listRoleHasPermission],
  );

  const extraCollapse = (listControl: any[]) => {
    const filterControlHasCheck = listControl.filter((item) =>
      selectedControlId.includes(item.id),
    );
    return (
      <div className="flex items-center w-auto gap-2 shrink-0">
        <span>
          {filterControlHasCheck?.length} / {listControl?.length}
        </span>
        <i className="w-5 h-5 shrink-0">
          <ChevronDownOutlined />
        </i>
      </div>
    );
  };

  const handleConfigPermission = () => {
    mutateSettingPermission({
      role_id: convertId,
      permission_id: selectedControlId,
    });
  };

  const listCollapse: ItemCollapseType[] = listPage?.map((item) => {
    return {
      key: item.id,
      label: <span className="truncate">{item.name}</span>,
      extra: extraCollapse(item.config_controls),
      children: listCheckboxNode(item.config_controls),
    };
  });

  return (
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
            type="success"
            htmlType="button"
            onClick={handleConfigPermission}
            icon={<BookmarkOutlined />}
            disabled={isFetching}
            loading={isLoading}
          >
            Lưu
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white shadow-xsm rounded-2xl">
        {listTab && <Tabs items={listTab} onChange={handleChangeTab} />}
        {!!listCollapse.length && (
          <Collapse
            defaultActiveKey={[listCollapse[0].key]}
            containerClassName="flex flex-col gap-5"
            headingClassName="border-b"
            contentClassName="border-b"
            items={listCollapse}
          />
        )}
      </div>
    </div>
  );
};

export default SettingConfigPermission;
