import { Route, Routes } from 'react-router-dom';

import CheckAuth from 'routers/CheckAuth';
import MiddlewareRouter from 'routers/MiddlewareRouter';

import { IRouteProps } from '_common/interface/router';

import BasicLayout from '_common/component/Layout/BasicLayout';
import EpicLayout from '_common/component/Layout/EpicLayout';
import PageLayout from '_common/component/Layout/PageLayout';
import UnAuthLayout from '_common/component/Layout/UnAuthLayout';

//
import { EPIC_KEY } from '_common/constants/permission';
import { EPIC_URL } from '_common/constants/url';

import PageNotfound from '_common/component/PageNotfound';

// auth
import CheckAuthPage from 'pages/Auth/CheckAuth';
import {
  ConfigApplicationRouter,
  ConfigDataRouter,
  ConfigDepartmentRouter,
  ConfigJobTitleRouter,
  ConfigPermissionRouter,
  ConfigPositionRouter,
  ConfigStatusRouter,
  ManagePageRouter,
} from 'pages/System/router';
import { EquipmentManage } from '../pages/ManageEquipment/router';
import DashboardPage from 'pages/Dashboard';
import { MaterialManage } from '../pages/ManageMaterial/router';

// dashboard router
const renderRouter = (objectRouter: IRouteProps[]) => {
  return objectRouter.map((route: IRouteProps) => {
    const { key, component, path } = route;
    return (
      <Route
        key={key}
        path={path}
        element={<PageLayout page_key={key}>{component}</PageLayout>}
      />
    );
  });
};

export const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MiddlewareRouter>
            <BasicLayout />
          </MiddlewareRouter>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="equipment">
          <Route
            path={EPIC_URL.EQUIPMENT_PAGE_URL}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_DATA} />}
          >
            {renderRouter(EquipmentManage)}
          </Route>
        </Route>
        <Route path="material">
          <Route
            path={EPIC_URL.MATERIAL_PAGE_URL}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_DATA} />}
          >
            {renderRouter(MaterialManage)}
          </Route>
        </Route>
        <Route path="system">
          <Route
            path={EPIC_URL.CONFIG_DATA}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_DATA} />}
          >
            {renderRouter(ConfigDataRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_STATUS}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_STATUS} />}
          >
            {renderRouter(ConfigStatusRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_APPLICATION}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_APPLICATION} />}
          >
            {renderRouter(ConfigApplicationRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_DEPARTMENT}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_DEPARTMENT} />}
          >
            {renderRouter(ConfigDepartmentRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_POSITION}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_POSITION} />}
          >
            {renderRouter(ConfigPositionRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_JOB_TITLE}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_JOB_TITLE} />}
          >
            {renderRouter(ConfigJobTitleRouter)}
          </Route>
          <Route
            path={EPIC_URL.CONFIG_PERMISSION}
            element={<EpicLayout epic_key={EPIC_KEY.CONFIG_PERMISSION} />}
          >
            {renderRouter(ConfigPermissionRouter)}
          </Route>
          <Route
            path={EPIC_URL.MANAGE_PAGE}
            element={<EpicLayout epic_key={EPIC_KEY.MANAGE_PAGE} />}
          >
            {renderRouter(ManagePageRouter)}
          </Route>
        </Route>
      </Route>
      <Route
        path="auth"
        element={
          <CheckAuth>
            <UnAuthLayout />
          </CheckAuth>
        }
      >
        <Route path="check-auth" element={<CheckAuthPage />} />
      </Route>
      <Route path="*" element={<PageNotfound />} />
    </Routes>
  );
};
