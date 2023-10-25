import classNames from 'classnames';
import React, { useEffect } from 'react';
import {
  AdjustmentsHorizontalOutlined,
  // EllipsisHorizontalOutlined,
  Icon,
} from 'tera-dls';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useStores } from '_common/hooks';
import { observer } from 'mobx-react-lite';

import MoreMenu from './MoreMenu';
import { IMenu } from './interface';
import useGroupMenu from '_common/hooks/useGroupMenu';

export interface MenuProps {}

const MenuComponent: React.FC<MenuProps> = observer(() => {
  const location = useLocation();

  const {
    commonStore: { activeMenu, setActiveMenu },
  } = useStores();
  // const {
  //   commonStore: { activeMenu, openMenuMore, setActiveMenu, setOpenMenuMore },
  // } = useStores();

  const menus = useGroupMenu();

  const updateActiveMenu = () => {
    const splitUrl = location?.pathname?.split('/');
    const checkMenu: IMenu = menus?.find(
      (obj) => splitUrl.indexOf(obj?.key) > -1,
    );
    checkMenu && setActiveMenu(String(checkMenu?.key));
  };

  useEffect(() => {
    location?.pathname && updateActiveMenu();
  }, [location, menus]);

  const handleActiveMenu = (key: string) => {
    setActiveMenu(key);
  };

  // const handleOpenMoreMenu = (): void => {
  //   setOpenMenuMore(!openMenuMore);
  // };

  const customItemClasses = (key?: string) => {
    return classNames(
      'relative gap-2.5 cursor-pointer [&_.menu-icon]:hover:text-blue-600 [&_.menu-title]:hover:text-blue-600',
      activeMenu === key
        ? '[&_.menu-icon]:text-blue-600 [&_.menu-title]:text-blue-600'
        : 'border-transparent',
    );
  };

  const activeColorIcon = (key?: string) => {
    return activeMenu === key ? '#1C64F2' : '';
  };

  const activeBorder = (key?: string) => {
    return activeMenu == key
      ? 'h-0.5 w-full bg-blue-600 rounded-t-sm mt-[-1px]'
      : '';
  };

  return (
    <>
      <div
        id="header_menu"
        className=" fixed top-[40px] z-[49] w-full h-[40px] flex items-center justify-between px-5 bg-white border-b border-gray-200 text-xxs shadow-xsm"
      >
        <ul className="flex space-x-5 h-full">
          {menus?.map((item: IMenu) => {
            const { id, key, icon, path, title } = item;
            return (
              <li
                className={customItemClasses(key)}
                key={id}
                onClick={() => handleActiveMenu(key)}
              >
                <div className="flex items-center h-full">
                  {icon && <Icon type={icon} color={activeColorIcon(key)} />}
                  {/* {iconNode && (
                <i className="w-5 h-5 text-gray-600 menu-icon">{iconNode}</i>
              )} */}
                  <span className="text-gray-800 text-xxs link-outer-container menu-title ml-2.5">
                    <Link to={path}> {title}</Link>
                  </span>
                </div>
                <div className={activeBorder(key)}></div>
              </li>
            );
          })}
          {/*<li className={customItemClasses()} onClick={handleOpenMoreMenu}>*/}
          {/*  <i className="w-5 h-5 text-gray-600 menu-icon">*/}
          {/*    <EllipsisHorizontalOutlined />*/}
          {/*  </i>*/}
          {/*  <span className="text-gray-800 text-xxs link-outer-container menu-title ">*/}
          {/*    Khác*/}
          {/*  </span>*/}
          {/*</li>*/}
        </ul>
        <div className="flex items-center gap-3.5 text-blue-600 cursor-pointer">
          <AdjustmentsHorizontalOutlined className="w-5 h-5" />
          <span>Cấu hình</span>
        </div>
        {/* more menu */}
      </div>
      <MoreMenu />
    </>
  );
});

export default MenuComponent;
