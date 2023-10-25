import { StatusEmployee } from 'pages/System/constants';
import { PresetColors } from 'tera-dls/lib/components/Tag/style';

export const listLayout = [
  {
    label: 'Table',
    value: 'table',
  },
  {
    label: 'Grid View',
    value: 'grid_view',
  },
];

export const statusFieldColor: Record<StatusEmployee, PresetColors> = {
  active: 'green06',
  inactive: 'gray03',
};
