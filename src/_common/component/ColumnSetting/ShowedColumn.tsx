import { useCallback, useEffect, useState } from 'react';
import { IColumnType } from './ColumnSettingOverview';
import ShowedColumnItem from './ShowedColumnItem';

interface IProps {
  value: Array<IColumnType>;
  onHideColumn: (id: number) => void;
  onSortColumn: (data?: any) => void;
}

const ShowedColumn = (props: IProps) => {
  const { value, onHideColumn, onSortColumn } = props;
  const [columns, setColumns] = useState<Array<IColumnType>>([]);

  useEffect(() => {
    value && setColumns(value);
  }, [value]);

  const handleMoveColumn = useCallback(
    (dragIndex: number, dropIndex: number): void => {
      setColumns((prev) => {
        const dragColumn = prev[dragIndex];
        const clonedColumn = [...prev];
        clonedColumn.splice(dragIndex, 1);
        clonedColumn.splice(dropIndex, 0, dragColumn);
        onSortColumn(clonedColumn);
        return clonedColumn;
      });
    },
    [setColumns],
  );

  const sortedColumns: Array<IColumnType> = columns.sort(
    (a, b) => a.order - b.order,
  );

  return (
    <>
      {sortedColumns.map((column: IColumnType, index: number) => {
        const { id, title, type } = column;
        return (
          <ShowedColumnItem
            {...{
              key: id,
              id,
              title,
              type,
              index,
              onShowColumn: onHideColumn,
              onMoveColumn: handleMoveColumn,
            }}
          />
        );
      })}
    </>
  );
};

export default ShowedColumn;
