import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormItem, MagnifyingGlassOutlined, Search } from 'tera-dls';
import * as yup from 'yup';

const schema = yup.object().shape({
  keyword: yup.string().nullable(),
});

interface IProps {
  onSearch: (value: any) => void;
  value?: string;
}
const SearchForm = (props: IProps) => {
  const { onSearch, value } = props;

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

  useEffect(() => {
    value && reset({ keyword: value });
  }, [value]);

  return (
    <Form
      onSubmit={handleSubmit(handleSearch)}
      className="sm:w-full md:w-full lg:w-[400px]"
    >
      <FormItem className="!mb-0">
        <Search
          placeholder="Tìm kiếm theo mã bảng DL, tiêu đề"
          icon={<MagnifyingGlassOutlined />}
          {...register('keyword')}
          className="w-full h-10"
        />
      </FormItem>
    </Form>
  );
};

export default SearchForm;
