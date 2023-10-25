import { Table } from 'tera-dls';
import useTeraTable from '../useTeraTable';

const TeraNormalTable = () => {
  const data = useTeraTable();

  return <Table {...data} />;
};

export default TeraNormalTable;
