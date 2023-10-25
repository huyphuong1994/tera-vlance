import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormItem, MagnifyingGlassOutlined, Search } from 'tera-dls';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
const schema = yup.object().shape({
  keyword: yup.string().nullable(),
});

interface IPropsHeader {
  onSearch: (value) => void;
  title: string;
}

function Header({ onSearch, title }: IPropsHeader) {
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
    <Form
      onSubmit={handleSubmit(handleSearch)}
      className="sm:w-full md:w-full lg:w-[400px]"
    >
      <FormItem className="mb-0">
        <Search
          placeholder={title}
          icon={<MagnifyingGlassOutlined />}
          {...register('keyword')}
          className="w-full h-10"
        />
      </FormItem>
    </Form>
  );
}

export default Header;
