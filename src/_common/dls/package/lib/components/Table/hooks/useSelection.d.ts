import { GetRowKey } from 'rc-table/lib/interface';
import { AnyObject, ColumnsType, SelectionItem, TableRowSelection } from '../interface';
interface UseSelectionConfig<RecordType extends AnyObject = AnyObject> {
    data: RecordType[];
    getRowKey?: GetRowKey<RecordType>;
}
export declare const SELECTION_COLUMN: {};
export declare const SELECTION_ALL: "SELECT_ALL";
export declare const SELECTION_INVERT: "SELECT_INVERT";
export declare const SELECTION_NONE: "SELECT_NONE";
export type INTERNAL_SELECTION_ITEM = SelectionItem;
declare const useSelection: <RecordType extends AnyObject = AnyObject>(config: UseSelectionConfig, rowSelection?: TableRowSelection<RecordType>) => (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
export default useSelection;
