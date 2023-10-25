/// <reference types="react" />
export interface PaginationProps {
    pageSizeOptions?: number[];
    total?: number;
    current?: number;
    defaultCurrent?: number;
    defaultPageSize?: number;
    pageSize?: number;
    disabled?: boolean;
    onChange?: (page?: number, pageSize?: number) => void;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
