import { useStores } from './useStores';

export function usePermission() {
  const {
    authStore: { role, permissions, modules, epics },
  } = useStores();

  const checkRole = () => {
    // try {
    //   if (role === 'admin') return true;
    //   if (!key) return false;
    //   if (typeof key === 'boolean') return key;
    //   if (permissions?.length === 0) return false;

    //   return permissions.indexOf(key) > -1;
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }
    return true;
  };

  const checkModule = () => {
    // try {
    //   if (role === 'admin') return true;
    //   if (!key) return false;
    //   if (typeof key === 'boolean') return key;
    //   if (modules?.length === 0) return false;

    //   return modules.indexOf(key) > -1;
    // } catch (err) {
    //   console.log(err);
    //   return false;
    // }

    return true;
  };

  const hasModule = (epic_key: string) => {
    if (role === 'admin') return true;
    if (epics.indexOf(epic_key) > -1) return true;

    return false;
  };

  const hasPage = (page_key: string) => {
    if (role === 'admin') return true;
    if (permissions.indexOf(page_key) > -1) return true;

    return false;
  };

  const hasButton = (button_key: string) => {
    if (role === 'admin') return true;
    if (permissions.indexOf(button_key) > -1) return true;

    return false;
  };

  return {
    permissions,
    modules,
    role,
    hasModule,
    hasPage,
    checkRole,
    checkModule,
    hasButton,
  };
}
