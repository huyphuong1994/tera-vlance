import { useQuery } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FormConfigApi from './_api';
import TeraFormContext from './TeraFormContext';
import FormWrapper from './FormWrapper';
import useFormTera from './useFormTera';
import FormTeraItem from './FormTeraItem';
import { FormTeraRefProps } from './_interfaces';
import TableWrapper from './TableWrapper';

interface FormTeraProps {
  children?: React.ReactNode;
  object_type?: string;
  object_id?: string;
  isUpdate?: boolean;
  isCreate?: boolean;
  isLoading?: boolean;
  onSubmit?: (value) => void;
  schemaCustom?: yup.ObjectShape;
  wrapper_type?: 'form' | 'table';
  form?: any;
  defaultValues?: any;
}

const FormTera = forwardRef<FormTeraRefProps, FormTeraProps>(
  (
    {
      object_type,
      object_id,
      isCreate,
      isUpdate,
      //  isLoading,
      wrapper_type = 'form',
      onSubmit,
      children,
      form: formProp,
      defaultValues,
    },
    ref,
  ) => {
    const { data } = useQuery(
      ['get-tera-form'],
      () => FormConfigApi.getConfig({ object_type, object_id }),
      {
        cacheTime: 300000,
        staleTime: 300000,
        enabled: !!object_type,
        retry: 2,
        retryDelay: 10000,
      },
    );

    const defaultForm = useForm({
      defaultValues,
    });
    const form = formProp ?? defaultForm;
    useImperativeHandle(
      ref,
      () => ({
        ...form,
        formState: form?.formState,
        isDirty: form?.formState?.isDirty,
        errors: form?.formState?.errors,
        submit: form.handleSubmit(onSubmit),
      }),
      [form, form.formState, ref],
    );

    const Wrapper = wrapper_type === 'form' ? FormWrapper : TableWrapper;
    return (
      <TeraFormContext
        form={{
          ...form,
          submit: form.handleSubmit(onSubmit),
        }}
        isCreate={isCreate}
        isUpdate={isUpdate}
        object_type={object_type}
        object_id={object_id}
        fields={data?.fields}
        layout={{
          title: data?.title,
          type: data?.layout,
          column: data?.column,
          order: data?.order,
          className: data?.class_name,
          show: data?.status === 'active' || !data?.code,
        }}
        isLoading={false}
      >
        <Wrapper onSubmit={form.handleSubmit(onSubmit)}>{children}</Wrapper>
      </TeraFormContext>
    );
  },
);

export { FormTeraItem, useFormTera };
export default FormTera;
