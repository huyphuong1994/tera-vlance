import _, { isArray } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

numeral.localeData().delimiters.thousands = ',';

export function formatNumber(value = 0, format = '0,0') {
  if (value === null || value === undefined) return '0';
  return numeral(value).format(format);
}

export function formatDate(value, format = 'DD/MM/YYYY', type?) {
  return value && value !== '0000-00-00 00:00:00'
    ? moment(value, type).format(format)
    : '';
}

function isValidDate(dateString) {
  if (!dateString) {
    return false;
  }
  const date = new Date(dateString);
  return !isNaN(Number(date?.getTime()));
}

export function formatDateInput(value) {
  const newDate = isValidDate(value) ? new Date(value) : null;
  return newDate ? moment(newDate).format('YYYY-MM-DD') : '';
}

export function removeKeyFromObject(
  originalObject: Record<string, any>,
  keyToRemove: string,
): Record<string, any> {
  const updatedObject = { ...originalObject };

  if (Object.prototype.hasOwnProperty.call(updatedObject, keyToRemove)) {
    delete updatedObject[keyToRemove];
  }

  return updatedObject;
}

export const getFieldObjToArr = (arr: any[], field: string) => {
  if (!isArray(arr)) return arr;
  const newArr = arr.map((item) => item?.[field]);
  return newArr;
};

export const parserParamsArray = (param) => {
  if (typeof param === 'object' && param !== null) {
    const convertedObj = {};

    for (const key in param) {
      if (Array.isArray(param[key])) {
        convertedObj[key] = param[key].join(',');
      } else {
        convertedObj[key] = param[key];
      }
    }

    return convertedObj;
  }
  return param;
};

export const getMomentData = (data) => {
  return data ? moment(data, 'hh:mm:ss') : null;
};

export function checkFileType(file_name) {
  const imageType = ['jpeg', 'jpg', 'png', 'gif'];
  const pdfType = ['pdf'];
  const docType = ['doc', 'docx'];
  const excelType = ['xlsx', 'csv', 'txt', 'xltx'];
  const zipType = ['zip', 'rar'];
  const zipOther = ['apk', 'psd', 'ai', 'sql'];
  const audioType = [
    'avi',
    'mov',
    'webm',
    'mp4',
    'm4p',
    'mpg',
    'mp2',
    'mpeg',
    'mpe',
    'mpv',
    'm4v',
    'svi',
  ];

  const fileNameSplit = file_name.split('.');
  const fileName = fileNameSplit[fileNameSplit?.length - 1];
  let type = 'file';
  if (imageType.indexOf(fileName) > -1) {
    type = 'image';
  } else if (pdfType.indexOf(fileName) > -1) {
    type = 'pdf';
  } else if (docType.indexOf(fileName) > -1) {
    type = 'word';
  } else if (excelType.indexOf(fileName) > -1) {
    type = 'excel';
  } else if (zipType.indexOf(fileName) > -1) {
    type = 'zip';
  } else if (audioType.indexOf(fileName) > -1) {
    type = 'audio';
  } else if (zipOther.indexOf(fileName) > -1) {
    type = 'other';
  }

  return type;
}

export const filterField = (params) => {
  const newParams = _.pickBy(params);
  return newParams;
};

export const mergeField = (...params) => {
  const newObj = _.merge({}, ...params);
  return newObj;
};

export const generateNumberDigit = (value: number | string) => {
  return value.toString().padStart(5, '0');
};

export const mergeArrayObjectByKey = (
  originalArray: Array<{ [key: string]: any }> = [],
  newArray: Array<{ [key: string]: any }> = [],
  key: string,
) => {
  const mergedObject = _.merge(
    _.keyBy(originalArray, key),
    _.keyBy(newArray, key),
  );
  return _.values(mergedObject);
};

export const mergeArrayObjectByKeyDependOnNewArray = (
  originalArray: Array<{ [key: string]: any }> = [],
  newArray: Array<{ [key: string]: any }> = [],
  key: string,
) => {
  const mergedObject = _.mergeWith(
    _.keyBy(newArray, key),
    _.keyBy(originalArray, key),
    (originalValue, newValue) => {
      if (!!originalValue?.[key] && !!newValue?.[key]) {
        return { ...newValue, ...originalValue };
      }
      if (!!originalValue?.[key] && !newValue?.[key]) return originalValue;

      return null;
    },
  );
  return _.values(mergedObject).filter((item) => item != null);
};

export const convertArrToString = (arr: string[], separate = ' - ') => {
  return arr
    .filter((item) => Boolean(typeof item === 'string' && !!item))
    .join(separate);
};

export const convertSize = (sizeBytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (sizeBytes >= 1024 && index < units.length - 1) {
    sizeBytes /= 1024;
    index++;
  }

  return `${sizeBytes.toFixed(0)} ${units[index]}`;
};

export const trimData = (code: string): string => {
  return code?.split(' ')?.join('');
};

export const convertListOrder = (
  listFieldOrder: any[],
  id: number | string,
  fieldDetail: any,
) => {
  const fistItem = { value: 0, label: 'Đứng đầu' };
  if (isArray(listFieldOrder)) {
    const arrExist = id
      ? listFieldOrder.filter((field: any) => field?.id !== fieldDetail?.id)
      : listFieldOrder;
    const mapArray = arrExist.map((Order) => ({
      value: Order?.order,
      label: Order?.title,
    }));
    return [fistItem, ...mapArray];
  }
  return [];
};

export const calcHeightTable = () => {
  const heightMenu = document.getElementById('header_menu').clientHeight;
  const heightHeader = document.getElementById('header').clientHeight;
  const heightHeaderViewList =
    document.getElementById('header_view_list').clientHeight;
  const heightMinus =
    heightMenu + heightHeader + heightHeaderViewList + 40 + 56 + 76;
  // 40: padding layout, 56: pagination, 76: headerTable
  return heightMinus;
};
