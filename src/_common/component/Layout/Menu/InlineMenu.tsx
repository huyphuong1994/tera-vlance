import useSubMenu from '_common/hooks/useSubMenu';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Collapse, Icon, ItemCollapseType } from 'tera-dls';
import { IMenu } from './interface';
import { useStores } from '_common/hooks';

export interface InlineMenuProps {
  containerClassName?: string;
}

const InlineMenu: React.FC<InlineMenuProps> = observer(
  ({ containerClassName }) => {
    const {
      commonStore: { activeMenu: activeGroupKey },
    } = useStores();

    const [collapseActiveKey, setCollapseActiveKey] = useState<string>();

    const location = useLocation();
    const navigate = useNavigate();
    const listMenu = useSubMenu();

    const handleClick = (path: string): void => navigate(path);

    const getActiveKeyInURL = (): string => {
      const split = location?.pathname?.split('/');
      const activeGroupKeyIndex = split?.findIndex((key) => {
        return key === activeGroupKey;
      });

      return split?.[activeGroupKeyIndex + 1] ?? '';
    };

    useEffect(() => {
      const activeKey = getActiveKeyInURL();
      setCollapseActiveKey(activeKey);
    }, [location, activeGroupKey]);

    const menuClasses = classNames(
      'bg-white flex flex-col gap-1 py-5 border-r border-gray-200 text-xxs min-h-[90vh] transition-all w-[215px] min-w-[215px]',
      containerClassName,
    );

    const isActiveKey = (key: string): boolean => collapseActiveKey === key;

    const getActiveClasses = (targetPath: string): string =>
      location?.pathname === targetPath ? 'bg-blue-100' : '';

    const listCollapse: ItemCollapseType[] = useMemo(
      () =>
        listMenu?.map((item: IMenu) => {
          const children = item.children;
          return {
            key: item.key,
            label: (
              <div onClick={() => navigate(item.path)}>
                <div className="flex items-center gap-2.5 font-normal text-gray-800">
                  <div
                    className={`w-[3px] h-[15px] rounded-r-[2px] ${
                      !isActiveKey(item.key) ? '' : 'bg-blue-700'
                    }`}
                  />
                  <Icon className="w-2.5 h-2.5" type={item.icon} />
                  {item.title}
                </div>
              </div>
            ),
            extra: (
              <div className="flex flex-col">
                {children?.map((child) => {
                  return (
                    <div
                      key={child.id}
                      onClick={() => handleClick(child.path)}
                      className={`flex items-center gap-2.5 cursor-pointer py-2.5 pl-6 ${getActiveClasses(
                        child.path,
                      )}`}
                    >
                      {child.name}
                    </div>
                  );
                })}
              </div>
            ),
            children: <></>,
          };
        }),
      [listMenu],
    );

    if (!listMenu?.length) return <></>;

    return (
      <ul className={menuClasses}>
        <Collapse
          accordion
          activeKey={collapseActiveKey}
          containerClassName="flex flex-col"
          headingClassName={`p-2.5 bg-blue100 border-none focus:ring-0 hover:bg-blue-100 duration-400`}
          contentClassName="border-none p-0 py-2.5 duration-500 hidden"
          activeClassName="bg-blue-100"
          onChange={(key: any) => {
            setCollapseActiveKey(key[0]);
          }}
          items={listCollapse}
        />
      </ul>
    );
  },
);

export default InlineMenu;
