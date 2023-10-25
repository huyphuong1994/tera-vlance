import { IMenu } from '_common/component/Layout/Menu/interface';
import { PageContext } from '_common/component/Layout/PageLayout';
import { useContext } from 'react';

const usePageConfig = () => {
  return useContext(PageContext) as IMenu;
};

export default usePageConfig;
