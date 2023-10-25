import NoPermission from '_common/component/NoPermission';
import { usePermission } from '_common/hooks/usePermission';
import { observer } from 'mobx-react-lite';
import { createContext, useMemo } from 'react';
//import { useQuery } from '@tanstack/react-query';
//import ManagePageApi from 'pages/System/containers/ManagePage/ListPage/_api';
import { IMenu } from '../Menu/interface';
import menu from './../Menu/menu.json';

interface PageLayoutProp {
  page_key: string;
  children?: any;
}

export const PageContext = createContext({});

const PageLayout = observer(({ page_key, children }: PageLayoutProp) => {
  const { hasPage } = usePermission();

  // const { data: pageConfig } = useQuery(
  //   ['get-page-by-object-type', location?.pathname],
  //   () => ManagePageApi.getConfig({ object_type: page_key }),
  //   {
  //     cacheTime: 300000,
  //     staleTime: 300000,
  //     enabled: !!page_key,
  //   },
  // );
  const pageConfig = undefined;
  if (!hasPage(page_key)) return <NoPermission />;

  const config = useMemo(() => {
    const defaultConfig: IMenu = menu.subMenu.find(
      (item) => item.code === page_key,
    );
    return { ...defaultConfig, ...(pageConfig ?? {}) };
  }, [pageConfig, menu.subMenu]);

  return (
    <PageContext.Provider value={config}>
      <div data-object_type={page_key} className="h-full">
        {children}
      </div>
    </PageContext.Provider>
  );
});

export default PageLayout;
