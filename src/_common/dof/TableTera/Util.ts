import { mergeArrayObjectByKeyDependOnNewArray } from 'tera-dls';
import { deviceBreakpoints } from './constants';

const isDesktopScreen = (currentScreenWidth: number): boolean =>
  currentScreenWidth <= deviceBreakpoints.desktop.width;

const isLargeTabletScreen = (currentScreenWidth: number): boolean =>
  currentScreenWidth < deviceBreakpoints.desktop.width &&
  currentScreenWidth >= deviceBreakpoints.largeTablet.width;

const isTabletScreen = (currentScreenWidth: number): boolean =>
  currentScreenWidth < deviceBreakpoints.largeTablet.width &&
  currentScreenWidth >= deviceBreakpoints.tablet.width;

const isMobileScreen = (currentScreenWidth: number): boolean =>
  currentScreenWidth < deviceBreakpoints.mobile.width;

export const getHiddenColumnDataIndexes = (
  currentScreenWidth: number,
  columns: any,
): Array<string> => {
  const result = new Set();

  columns?.forEach((column) => {
    const {
      lock = false,
      show_desktop = true,
      hide_tablet_lg = 0,
      hide_tablet = 0,
      show_mobile = 0,
      //hide_mini_mobile = 0,
      dataIndex,
    } = column;

    if (lock) return;

    switch (true) {
      case isDesktopScreen(currentScreenWidth) && !show_desktop:
        result.add(dataIndex);
        break;
      case isLargeTabletScreen(currentScreenWidth) && Boolean(hide_tablet_lg):
        result.add(dataIndex);
        break;
      case isTabletScreen(currentScreenWidth) && Boolean(hide_tablet):
        result.add(dataIndex);
        break;
      case isMobileScreen(currentScreenWidth) && !show_mobile:
        result.add(dataIndex);
        break;
      // case isMiniMobileScreen(currentScreenWidth) && Boolean(hide_mini_mobile):
      //   result.add(dataIndex);
      //   break;
    }
  });
  return [...result] as Array<string>;
};

export const getRowKey = (rowKey, item) => {
  if (typeof rowKey === 'function') return rowKey(item);
  return item[rowKey];
};

export const mapDefaultIndexNumber = (columns, indexNumberObject) => {
  return mergeArrayObjectByKeyDependOnNewArray(
    [indexNumberObject],
    columns,
    'dataIndex',
  );
};
