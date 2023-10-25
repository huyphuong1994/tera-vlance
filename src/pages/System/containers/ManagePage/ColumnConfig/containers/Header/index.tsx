import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, MagnifyingGlassOutlined, Search } from 'tera-dls';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
const schema = yup.object().shape({
  keyword: yup.string().nullable(),
});

function ColumnConfigHeader({ onSearch }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSearch = (value) => {
    if (isDirty) {
      onSearch(value);
      reset({ ...value }, { keepValues: true });
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleSearch)} className="lg:w-[400px] flex-1">
      <FormItem className="!mb-0">
        <Search
          placeholder="Tìm kiếm theo mã cột, tiêu đề"
          icon={<MagnifyingGlassOutlined />}
          {...register('keyword')}
        />
      </FormItem>
    </Form>
  );
}

export default ColumnConfigHeader;
