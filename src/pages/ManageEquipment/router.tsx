import { IRouteProps } from '../../_common/interface/router';
import { EQUIPMENT_PAGE_URL } from '../../_common/constants/url';
import EquipmentPageDetail from './Equipment/container/Detail/container';
import EquipmentList from './Equipment';
import EquipmentCategory from './Category';
import EquipmentManeuver from './Maneuver';
import EquipmentFix from './Fix';

export const EquipmentManage: IRouteProps[] = [
  {
    key: EQUIPMENT_PAGE_URL.list.key,
    path: EQUIPMENT_PAGE_URL.list.shortenUrl,
    component: <EquipmentList />,
  },
  {
    key: EQUIPMENT_PAGE_URL.detail.key,
    path: EQUIPMENT_PAGE_URL.detail.shortenUrl,
    component: <EquipmentPageDetail />,
  },
  {
    key: EQUIPMENT_PAGE_URL.category.key,
    path: EQUIPMENT_PAGE_URL.category.shortenUrl,
    component: <EquipmentCategory />,
  },
  {
    key: EQUIPMENT_PAGE_URL.maneuver.key,
    path: EQUIPMENT_PAGE_URL.maneuver.shortenUrl,
    component: <EquipmentManeuver />,
  },
  {
    key: EQUIPMENT_PAGE_URL.fix.key,
    path: EQUIPMENT_PAGE_URL.fix.shortenUrl,
    component: <EquipmentFix />,
  },
];
