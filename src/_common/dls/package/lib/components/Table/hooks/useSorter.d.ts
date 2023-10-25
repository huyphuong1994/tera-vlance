import { AnyObject, ColumnsType, TableProps } from '../interface';
declare const useSorter: <RecordType extends AnyObject = AnyObject>(props: TableProps<RecordType>) => (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
export default useSorter;
