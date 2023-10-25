import { PresetColors } from 'tera-dls/lib/components/Tag/style';

export const optionsBusinessId = [{ value: 1, label: 'business 1' }];

export const statusOnOffString = {
  inactive: {
    name: 'Tắt',
    color: 'red06',
  },
  active: {
    name: 'Bật',
    color: 'green06',
  },
};

export type StatusType = 'active' | 'waiting_work';

export const statusConfigColor: Record<StatusType, PresetColors> = {
  active: 'green04',
  waiting_work: 'yellow04',
};

export const statusTextColor: Record<StatusType, PresetColors> = {
  active: 'green04',
  waiting_work: 'red04',
};

export const statusSummary = {
  ACTIVE: 'active',
  WAITING_WORK: 'waiting_work',
  ALL: 'all',
};
