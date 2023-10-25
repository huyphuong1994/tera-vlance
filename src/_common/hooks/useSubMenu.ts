//import { useQuery } from '@tanstack/react-query';
//import ManagePageApi from 'pages/System/containers/ManagePage/ListPage/_api';
import { useStores } from './useStores';
import menu from '../component/Layout/Menu/menu.json';
//import { systemSubMenu } from '_common/component/Layout/Menu/menus';

const useSubMenu = () => {
  const {
    commonStore: { activeMenu },
  } = useStores();

  // useQuery(
  //   ['get-page-by-menu-id', activeMenu],
  //   () => ManagePageApi.getList({ parent_key: activeMenu }),
  //   {
  //     cacheTime: 300000,
  //     staleTime: 300000,
  //     enabled: !!activeMenu,
  //   },
  // );
  const defaultMenu = menu;

  const getSubMenu = (targetParentKey) =>
    defaultMenu.subMenu.filter((item) => item?.parentKey === targetParentKey);

  const menus = defaultMenu.parentMenu
    ?.filter((item) => item?.parentKey === activeMenu)
    ?.map((parent) => {
      const children = getSubMenu(parent.key);
      return { ...parent, children: children ?? [] };
    });

  return menus;
};

export default useSubMenu;
