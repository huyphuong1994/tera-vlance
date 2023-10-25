import { AnyObject, ColumnsType, TableProps } from '../interface';
interface UseHiddenColumns<RecordType extends AnyObject = AnyObject> {
    hiddenColumns?: TableProps<RecordType>['hiddenColumns'];
}
declare const useHiddenColumns: <RecordType extends AnyObject = AnyObject>({ hiddenColumns, }: UseHiddenColumns) => (columns: ColumnsType<unknown>) => ColumnsType<RecordType>;
export default useHiddenColumns;
