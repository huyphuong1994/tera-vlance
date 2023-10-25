import { XMarkOutlined } from 'tera-dls';
import { useDrag, useDrop } from 'react-dnd';
import { useEffect, useRef } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import CustomDragPlayer from './CustomDragPlayer';

interface IProps {
  id: number;
  type: string;
  title: string;
  index: number;
  onShowColumn: (id: number) => void;
  onMoveColumn: (dragIndex: number, dropIndex: number) => void;
}
const TYPE_HIDDEN_TABLE_COLUMN_DND = 'type_hidden_table_column_dnd';

export default (props: IProps) => {
  const { id, type, title, onShowColumn, index, onMoveColumn } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: TYPE_HIDDEN_TABLE_COLUMN_DND,
      item: { id, dragIndex: index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [index],
  );
  const [, drop] = useDrop(
    () => ({
      accept: TYPE_HIDDEN_TABLE_COLUMN_DND,
      drop({ dragIndex }) {
        onMoveColumn(dragIndex, index);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [index],
  );

  const disableDraggableElement = (): void => {
    dragPreview(getEmptyImage());
  };

  useEffect(() => {
    disableDraggableElement();
  }, []);

  drop(drag(ref));
  return (
    <div key={id}>
      <div
        ref={ref}
        className=" py-[0.9375rem] flex justify-between items-center px-2.5 outline outline-1 outline-solid text-sm font-normal rounded-[0.3125rem]	outline-[#E5E7EB]"
        style={{
          visibility: isDragging ? 'hidden' : 'inherit',
        }}
      >
        <span> {type === 'action' ? 'action' : title}</span>
        <XMarkOutlined
          onClick={() => onShowColumn(id)}
          width={'1rem'}
          height={'1rem'}
          className="cursor-pointer text-xs"
        />
      </div>
      <CustomDragPlayer {...{ id, title, type, ref }} />
    </div>
  );
};
