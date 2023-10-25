import { createContext, useContext, useMemo } from 'react';
import { FormTeraRefProps, ILayoutForm } from './_interfaces';

export interface TeraFormContextProps {
  form?: FormTeraRefProps;
  fields?: any[];
  object_type?: string;
  object_id?: string;
  isLoading?: boolean;
  isCreate?: boolean;
  isUpdate?: boolean;
  layout?: ILayoutForm;
  children: any;
}

export interface TeraFormContextReturn {
  form?: FormTeraRefProps;
  fields?: any[];
  object_type?: string;
  object_id?: string;
  isLoading?: boolean;
  isCreate?: boolean;
  isUpdate?: boolean;
  layout?: ILayoutForm;
}

export const FormContext = createContext({});

function TeraFormContext({
  form,
  fields,
  isCreate,
  isUpdate,
  object_type,
  object_id,
  isLoading,
  layout,
  children,
}: TeraFormContextProps) {
  const formReturn = useMemo(() => {
    return {
      form,
      fields,
      isCreate,
      isUpdate,
      isLoading,
      object_type,
      object_id,
      layout,
    };
  }, [
    form,
    fields,
    isCreate,
    isUpdate,
    isLoading,
    layout,
    object_type,
    object_id,
  ]);

  return (
    <FormContext.Provider value={formReturn}>{children}</FormContext.Provider>
  );
}

export function useTeraForm(): TeraFormContextReturn {
  return useContext(FormContext);
}
export default TeraFormContext;
