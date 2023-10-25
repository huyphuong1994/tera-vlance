export const DATE_TIME_FORMAT = 'DD/MM/YYYY';
export const LOCATION_KEY = 'location_id';

export const LocalStorage = {
  Token: 'tera_cms_token',
  Device: 'tera_device_init',
  Permission: 'tera_permission',
  StockId: 'tera_stock_id',
  LocationId: 'tera_location_id',
  RefCode: 'tera_ref_code',
};

const isDev = process.env.NODE_ENV === 'development';

export const endpointMockData =
  'https://c271729d-0a4c-448c-9d8b-f8523695ef42.mock.pstmn.io';

export const endpoint = isDev
  ? `${process.env.REACT_APP_API_DEV}/api`
  : `${process.env.REACT_APP_API_PROD}/api`;

export const HrmEndpoint = isDev
  ? `${process.env.REACT_APP_HRM_API_DEV}/api`
  : `${process.env.REACT_APP_HRM_API_DEV}/api`;

export const PortalEndpoint = isDev
  ? `${process.env.REACT_APP_PORTAL_API_DEV}/api`
  : `${process.env.REACT_APP_PORTAL_API_PROD}/api`;

export const authEndpoint = isDev
  ? `${process.env.REACT_APP_AUTH_API_DEV}/api`
  : `${process.env.REACT_APP_AUTH_API_PROD}/api`;

export const serverUrl = isDev
  ? process.env.REACT_APP_API_DEV
  : process.env.REACT_APP_API_PROD;

export const socketUrl = isDev
  ? process.env.REACT_APP_SOCKET_DEV
  : process.env.REACT_APP_SOCKET_PROD;

export const config = {
  google: {
    clientID: '',
    keyGMap: '',
  },
  fbConfig: {
    appId: '',
    version: 'v1.0',
  },
  hasHeader: false,
  hasMobile: true,
  templates: ['tera'],
  languages: ['vn'],
  app: {},
  uploadKey: '9074c259a7',
  appId: '2',
  privateKey: process.env.REACT_APP_PRIVATE_KEY,
};

export const gender = {
  male: 'Nam',
  female: 'Nữ',
};

export const genderFull = {
  all: 'Tất cả',
  male: 'Nam',
  female: 'Nữ',
};

export const REGEX = {
  PHONE_NUMBER:
    /^(?:(\+?84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])([0-9]{7}))?$/,
  CODE: /^[a-zA-Z0-9_]*$/,
};

export const month = {
  1: 'Tháng 1',
  2: 'Tháng 2',
  3: 'Tháng 3',
  4: 'Tháng 4',
  5: 'Tháng 5',
  6: 'Tháng 6',
  7: 'Tháng 7',
  8: 'Tháng 8',
  9: 'Tháng 9',
  10: 'Tháng 10',
  11: 'Tháng 11',
  12: 'Tháng 12',
};

export const timeFormat = {
  time_half: 'hh:mm',
  time_full: 'HH:mm',
};

export const TypesOverTime = {
  weekday: 'Ngày thường',
  weekday_night: 'Ngày thường (đêm)',
  off: 'Ngày nghỉ',
  off_night: 'Ngày nghỉ (đêm)',
  holiday: 'Ngày lễ',
  holiday_night: 'Ngày lễ (đêm)',
};

export const TypesOverForm = {
  payroll: 'Tính lương',
  compensatory_leave: 'Nghỉ bù',
};
