import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormItem,
  MagnifyingGlassOutlined,
  Search,
  getQueryParams,
} from 'tera-dls';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const schema = yup.object().shape({
  keyword: yup.string().nullable(),
});

function ManeuverPageHeader({ onSearch }) {
  const { search } = useLocation();
  const queryParams = getQueryParams(search) as any;
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      keyword: queryParams?.keyword,
    },
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
      <FormItem className="!mb-0">
        <Search
          placeholder="Tìm kiếm theo tên vật tư"
          icon={<MagnifyingGlassOutlined />}
          {...register('keyword')}
          className="w-full"
        />
      </FormItem>
    </Form>
  );
}

export default ManeuverPageHeader;
