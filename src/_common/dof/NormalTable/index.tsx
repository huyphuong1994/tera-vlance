import { Table, useDetectDevice } from 'tera-dls';
import { useMemo } from 'react';
import { getHiddenColumnDataIndexes } from '../ConfigurationTable';

interface IProps {
  defaultColumns: any;
  [key: string]: any;
}

const NormalTable = (props: IProps) => {
  const { defaultColumns, ...restProps } = props;

  const { widthScreen } = useDetectDevice();

  const hiddenColumnDataIndexes = useMemo(
    (): Array<string> =>
      getHiddenColumnDataIndexes(widthScreen, defaultColumns),
    [defaultColumns, widthScreen],
  );

  return (
    <Table
      {...restProps}
      hiddenColumns={hiddenColumnDataIndexes ?? []}
      columns={defaultColumns}
    />
  );
};

export default NormalTable;
