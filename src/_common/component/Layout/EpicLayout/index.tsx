import React from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { usePermission } from '_common/hooks/usePermission';
import NoPermission from '_common/component/NoPermission';

interface EpicLayoutProp {
  epic_key: string;
}

const EpicLayout: React.FC<EpicLayoutProp> = observer(({ epic_key }) => {
  const { hasModule } = usePermission();

  if (!hasModule(epic_key)) return <NoPermission />;

  return <Outlet />;
});

export default EpicLayout;
