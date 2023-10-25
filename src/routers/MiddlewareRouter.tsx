import { observer } from 'mobx-react-lite';
import { useStores } from '_common/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { IMiddleRouterProps } from '../_common/interface/router';

const MiddlewareRouter = observer(({ children }: IMiddleRouterProps) => {
  const { authStore } = useStores();
  const location = useLocation();

  if (authStore.device && !authStore.authenticated) {
    return (
      <Navigate to="/auth/check-auth" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
});

export default MiddlewareRouter;
