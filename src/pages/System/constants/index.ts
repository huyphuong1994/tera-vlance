import { PresetColors } from 'tera-dls/lib/components/Tag/style';

export type StatusEmployee = 'active' | 'inactive';
export const statusConfigColor: Record<StatusEmployee, PresetColors> = {
  active: 'green06',
  inactive: 'red06',
};

export const classTitle = 'font-bold text-sm text-[#111827]';
export const classText = 'text-sm text-[#111827]';
