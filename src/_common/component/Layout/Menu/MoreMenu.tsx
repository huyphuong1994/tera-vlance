import React, { useEffect } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStores } from '_common/hooks';

export interface MoreMenuProps {}
const MoreMenu: React.FC<MoreMenuProps> = observer(() => {
  const {
    commonStore: { activeMenu, openMenuMore, setOpenMenuMore },
  } = useStores();

  useEffect(() => {
    activeMenu && setOpenMenuMore(false);
  }, [activeMenu]);

  const menuClasses = classNames(
    'fixed z-40 w-full bg-white flex gap-12 items-center px-5 py-2.5 transition-all',
    openMenuMore
      ? 'top-[90px] mt-0 border border-gray-200'
      : '-z-10 -mt-[89px] border-none',
  );

  return <div className={menuClasses}></div>;
});

export default MoreMenu;
