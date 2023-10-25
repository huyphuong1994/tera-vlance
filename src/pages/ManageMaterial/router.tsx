import { IRouteProps } from '../../_common/interface/router';
import { MATERIAL_PAGE_URL } from '../../_common/constants/url';
import MaterialList from './Material';
import MaterialCategory from './Category';
import MaterialManeuver from './Maneuver';
import ReportList from './Report';

export const MaterialManage: IRouteProps[] = [
  {
    key: MATERIAL_PAGE_URL.list.key,
    path: MATERIAL_PAGE_URL.list.shortenUrl,
    component: <MaterialList />,
  },
  {
    key: MATERIAL_PAGE_URL.category.key,
    path: MATERIAL_PAGE_URL.category.shortenUrl,
    component: <MaterialCategory />,
  },
  {
    key: MATERIAL_PAGE_URL.maneuver.key,
    path: MATERIAL_PAGE_URL.maneuver.shortenUrl,
    component: <MaterialManeuver />,
  },
  {
    key: MATERIAL_PAGE_URL.report.key,
    path: MATERIAL_PAGE_URL.report.shortenUrl,
    component: <ReportList />,
  },
];
