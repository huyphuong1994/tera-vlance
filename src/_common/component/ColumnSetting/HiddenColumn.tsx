import { Checkbox } from 'tera-dls';
import { IColumnType } from './ColumnSettingOverview';

interface IProps {
  value: Array<IColumnType>;
  onShowColumn: (id: number) => void;
}

const HiddenColumn = (props: IProps) => {
  const { value = [], onShowColumn } = props;
  return (
    <>
      {value?.map((column: IColumnType) => {
        const { id, show_desktop = false, title, type } = column;
        return (
          <div className="py-[0.9375rem] pl-2.5" key={id}>
            <Checkbox
              onChange={() => onShowColumn(id)}
              value={id}
              checked={!show_desktop}
              className={`${show_desktop ? 'cursor-default' : ''}`}
            >
              <span
                className={`text-normal font-normal ${
                  show_desktop ? 'text-gray-400 cursor-default' : ''
                }`}
              >
                {type === 'action' ? 'action' : title}
              </span>
            </Checkbox>
          </div>
        );
      })}
    </>
  );
};

export default HiddenColumn;
