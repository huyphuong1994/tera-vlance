import { EXPAND_COLUMN } from 'rc-table';
import 'rc-table/assets/index.css';
import { SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE } from './hooks/useSelection';
import { RefInternalTable } from './interface';
declare const ForwardTable: RefInternalTable & {
    SELECTION_COLUMN: typeof SELECTION_COLUMN;
    EXPAND_COLUMN: typeof EXPAND_COLUMN;
    SELECTION_ALL: typeof SELECTION_ALL;
    SELECTION_INVERT: typeof SELECTION_INVERT;
    SELECTION_NONE: typeof SELECTION_NONE;
};
export default ForwardTable;
