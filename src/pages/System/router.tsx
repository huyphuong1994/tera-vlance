import {
  CONFIG_APPLICATION_URL,
  CONFIG_DATA_URL,
  CONFIG_DEPARTMENT_URL,
  CONFIG_JOB_TITLE_URL,
  CONFIG_PERMISSION_URL,
  CONFIG_POSITION_URL,
  CONFIG_STATUS_URL,
  MANAGE_PAGE_CONFIG_FORM_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import { IRouteProps } from '_common/interface/router';
import ConfigData from './containers/ConfigData';
import ConfigStatus from './containers/ConfigStatus';
import ManagePage from './containers/ManagePage/ListPage';
import FormConfig from './containers/ManagePage/FormConfig';
import ConfigApplication from './containers/ConfigApplication';
import ConfigDepartment from './containers/ConfigDepartment';
import ConfigPosition from './containers/ConfigPosition';
import ConfigJobTitle from './containers/ConfigJobTitle';
import ConfigPermission from './containers/ConfigPermission';
import FormConfigDetail from './containers/ManagePage/FormConfig/containers/Detail';
import FieldConfig from './containers/ManagePage/FormConfig/containers/FieldConfig';
import TableConfigOverview from './containers/ManagePage/TableConfig';
import SettingConfigPermission from './containers/ConfigPermission/containers/Setting';
import ControlConfig from './containers/ManagePage/ControlConfig';
import ManagePageDetail from './containers/ManagePage/ListPage/containers/Detail';
import ColumnConfig from './containers/ManagePage/ColumnConfig';
import TableConfigDetail from './containers/ManagePage/TableConfig/container/Detail';

export const ConfigDataRouter: IRouteProps[] = [
  {
    key: CONFIG_DATA_URL.list.key,
    path: CONFIG_DATA_URL.list.shortenUrl,
    component: <ConfigData />,
  },
];

export const ConfigStatusRouter: IRouteProps[] = [
  {
    key: CONFIG_STATUS_URL.list.key,
    path: CONFIG_STATUS_URL.list.shortenUrl,
    component: <ConfigStatus />,
  },
];

export const ConfigApplicationRouter: IRouteProps[] = [
  {
    key: CONFIG_APPLICATION_URL.list.key,
    path: CONFIG_APPLICATION_URL.list.shortenUrl,
    component: <ConfigApplication />,
  },
];

export const ConfigDepartmentRouter: IRouteProps[] = [
  {
    key: CONFIG_DEPARTMENT_URL.list.key,
    path: CONFIG_DEPARTMENT_URL.list.shortenUrl,
    component: <ConfigDepartment />,
  },
];

export const ConfigPositionRouter: IRouteProps[] = [
  {
    key: CONFIG_POSITION_URL.list.key,
    path: CONFIG_POSITION_URL.list.shortenUrl,
    component: <ConfigPosition />,
  },
];

export const ConfigJobTitleRouter: IRouteProps[] = [
  {
    key: CONFIG_JOB_TITLE_URL.list.key,
    path: CONFIG_JOB_TITLE_URL.list.shortenUrl,
    component: <ConfigJobTitle />,
  },
];

export const ConfigPermissionRouter: IRouteProps[] = [
  {
    key: CONFIG_PERMISSION_URL.list.key,
    path: CONFIG_PERMISSION_URL.list.shortenUrl,
    component: <ConfigPermission />,
  },
  {
    key: CONFIG_PERMISSION_URL.setting.key,
    path: CONFIG_PERMISSION_URL.setting.shortenUrl,
    component: <SettingConfigPermission />,
  },
];

export const ManagePageRouter: IRouteProps[] = [
  {
    key: MANAGE_PAGE_URL.list.key,
    path: MANAGE_PAGE_URL.list.shortenUrl,
    component: <ManagePage />,
  },
  {
    key: MANAGE_PAGE_URL.detail.key,
    path: MANAGE_PAGE_URL.detail.shortenUrl,
    component: <ManagePageDetail />,
  },
  {
    key: MANAGE_PAGE_URL.columnConfig.key,
    path: MANAGE_PAGE_URL.columnConfig.shortenUrl,
    component: <ColumnConfig />,
  },
  {
    key: MANAGE_PAGE_URL.tableConfig.key,
    path: MANAGE_PAGE_URL.tableConfig.shortenUrl,
    component: <TableConfigOverview />,
  },
  {
    key: MANAGE_PAGE_URL.tableConfigDetail.key,
    path: MANAGE_PAGE_URL.tableConfigDetail.shortenUrl,
    component: <TableConfigDetail />,
  },
  {
    key: MANAGE_PAGE_CONFIG_FORM_URL.list.key,
    path: MANAGE_PAGE_CONFIG_FORM_URL.list.shortenUrl,
    component: <FormConfig />,
  },
  {
    key: MANAGE_PAGE_CONFIG_FORM_URL.detail.key,
    path: MANAGE_PAGE_CONFIG_FORM_URL.detail.shortenUrl,
    component: <FormConfigDetail />,
  },
  {
    key: MANAGE_PAGE_CONFIG_FORM_URL.configField.key,
    path: MANAGE_PAGE_CONFIG_FORM_URL.configField.shortenUrl,
    component: <FieldConfig />,
  },
  {
    key: MANAGE_PAGE_CONFIG_FORM_URL.configField.key,
    path: MANAGE_PAGE_CONFIG_FORM_URL.configField.shortenUrl,
    component: <FieldConfig />,
  },
  {
    key: MANAGE_PAGE_URL.controlConfig.key,
    path: MANAGE_PAGE_URL.controlConfig.shortenUrl,
    component: <ControlConfig />,
  },
];
