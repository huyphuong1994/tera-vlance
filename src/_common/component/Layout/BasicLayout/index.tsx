import React from 'react';
import { observer } from 'mobx-react-lite';

import DesktopLayout from './DesktopLayout';
import { useStores } from '_common/hooks';
import PageLoading from '_common/component/PageLoading';

const BasicLayout = observer(() => {
  const {
    authStore: { authenticated },
  } = useStores();

  if (!authenticated) return <PageLoading />;

  return (
    <>
      <DesktopLayout />
    </>
  );
});

export default BasicLayout;
