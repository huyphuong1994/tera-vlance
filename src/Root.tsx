import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { AuthApi } from 'states/api';

import { useStores } from '_common/hooks';

import { Routers } from './routers';

const basename = document.querySelector('base')?.getAttribute('href') ?? '/';

const Root = observer(() => {
  const { authStore } = useStores();

  useQuery(['get_device'], AuthApi.getDeviceCode, {
    staleTime: 300000,
    // enabled: !authStore.device,
    onSuccess: (data) => {
      authStore.setInitData(data);
    },
  });

  useQuery(['get_profile'], AuthApi.getProfile, {
    staleTime: 300000,
    enabled: !!authStore.token,
    onSuccess: (res) => {
      authStore.updateUser({ user: res?.data });
    },
  });

  // useQuery(['get_module'], () => AuthApi.getModule({}), {
  //   staleTime: 300000,
  //   enabled: !!authStore.token,
  //   onSuccess: (res) => {
  //     authStore.updateModules(res?.data);
  //   },
  // });

  return (
    <BrowserRouter basename={basename}>
      <Routers />
    </BrowserRouter>
  );
});

export default Root;
