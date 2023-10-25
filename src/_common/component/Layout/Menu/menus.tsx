import {
  BoltOutlined,
  BuildingLibraryOutlined,
  CircleStackOutlined,
  CogOutlined,
  DocumentDuplicateOutlined,
  DocumentOutlined,
  EllipsisHorizontalOutlined,
  HomeModernOutlined,
  HomeOutlined,
  ListBulletOutlined,
  UserOutlined,
  WrenchScrewdriverOutlined,
} from 'tera-dls';

import {
  CONFIG_APPLICATION_URL,
  CONFIG_DATA_URL,
  CONFIG_DEPARTMENT_URL,
  CONFIG_JOB_TITLE_URL,
  CONFIG_PERMISSION_URL,
  CONFIG_POSITION_URL,
  CONFIG_STATUS_URL,
  MANAGE_PAGE_URL,
} from '_common/constants/url';
import { IMenu, SubMenu, TypeMoreMenu } from './interface';

export const dashboardMenu: IMenu = {
  iconNode: <HomeOutlined />,
  title: 'Trang chủ',
  path: '/dashboard',
  key: 'dashboard',
  id: 'home',
};

export const systemMenu: IMenu = {
  iconNode: <CogOutlined />,
  title: 'Hệ thống',
  path: '/system/config-data',
  key: 'system',
  id: 'system',
};

export const systemSubMenu: IMenu[] = [
  {
    iconNode: <CircleStackOutlined />,
    name: 'Cấu hình dữ liệu',
    path: CONFIG_DATA_URL.list.path,
    id: CONFIG_DATA_URL.list.key,
  },
  {
    iconNode: <ListBulletOutlined />,
    name: 'Cấu hình trạng thái',
    path: CONFIG_STATUS_URL.list.path,
    id: CONFIG_STATUS_URL.list.key,
  },
  {
    iconNode: <DocumentOutlined />,
    name: 'Cấu hình loại đơn từ',
    path: CONFIG_APPLICATION_URL.list.path,
    id: CONFIG_APPLICATION_URL.list.key,
  },
  {
    iconNode: <BuildingLibraryOutlined />,
    name: 'Cấu hình phòng ban',
    path: CONFIG_DEPARTMENT_URL.list.path,
    id: CONFIG_DEPARTMENT_URL.list.key,
  },
  {
    iconNode: <BoltOutlined />,
    name: 'Cấu hình vị trí',
    path: CONFIG_POSITION_URL.list.path,
    id: CONFIG_POSITION_URL.list.key,
  },
  {
    iconNode: <UserOutlined />,
    name: 'Cấu hình chức danh',
    path: CONFIG_JOB_TITLE_URL.list.path,
    id: CONFIG_JOB_TITLE_URL.list.key,
  },
  {
    iconNode: <WrenchScrewdriverOutlined />,
    name: 'Cấu hình quyền',
    path: CONFIG_PERMISSION_URL.list.path,
    id: CONFIG_PERMISSION_URL.list.key,
  },
  {
    iconNode: <DocumentDuplicateOutlined />,
    name: 'Quản lý trang',
    path: MANAGE_PAGE_URL.list.path,
    id: MANAGE_PAGE_URL.list.key,
  },
];

export const subMenus: SubMenu = {
  system: [
    {
      icon: <CircleStackOutlined />,
      title: 'Cấu hình dữ liệu',
      path: CONFIG_DATA_URL.list.path,
      key: CONFIG_DATA_URL.list.key,
    },
    {
      icon: <ListBulletOutlined />,
      title: 'Cấu hình trạng thái',
      path: CONFIG_STATUS_URL.list.path,
      key: CONFIG_STATUS_URL.list.key,
    },
    {
      icon: <DocumentOutlined />,
      title: 'Cấu hình loại đơn từ',
      path: CONFIG_APPLICATION_URL.list.path,
      key: CONFIG_APPLICATION_URL.list.key,
    },
    {
      icon: <BuildingLibraryOutlined />,
      title: 'Cấu hình phòng ban',
      path: CONFIG_DEPARTMENT_URL.list.path,
      key: CONFIG_DEPARTMENT_URL.list.key,
    },
    {
      icon: <BoltOutlined />,
      title: 'Cấu hình vị trí',
      path: CONFIG_POSITION_URL.list.path,
      key: CONFIG_POSITION_URL.list.key,
    },
    {
      icon: <UserOutlined />,
      title: 'Cấu hình chức danh',
      path: CONFIG_JOB_TITLE_URL.list.path,
      key: CONFIG_JOB_TITLE_URL.list.key,
    },
    {
      icon: <WrenchScrewdriverOutlined />,
      title: 'Cấu hình quyền',
      path: CONFIG_PERMISSION_URL.list.path,
      key: CONFIG_PERMISSION_URL.list.key,
    },
    {
      icon: <DocumentDuplicateOutlined />,
      title: 'Quản lý trang',
      path: MANAGE_PAGE_URL.list.path,
      key: MANAGE_PAGE_URL.list.key,
    },
  ],
};

export const moreMenu: TypeMoreMenu[] = [
  {
    icon: <HomeModernOutlined />,
    title: 'Trang chủ',
    key: 'dashboard1',
    path: '/',
    img: { src: 'https://via.placeholder.com/1280x720' },
  },
  {
    icon: <HomeModernOutlined />,
    title: 'Hệ thống',
    key: 'system',
    path: '/system',
    img: { src: 'https://via.placeholder.com/1280x720' },
  },
  {
    icon: <EllipsisHorizontalOutlined />,
    title: 'More',
    key: 'home',
    path: '/',
    img: { src: 'https://via.placeholder.com/1280x720' },
  },
];
