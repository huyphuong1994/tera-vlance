import { RefObject, useMemo, useRef } from 'react';
import { FormTeraRefProps, defaultRef } from './_interfaces';

function useFormTera(form?): [RefObject<FormTeraRefProps>, FormTeraRefProps] {
  const forRef = useRef<FormTeraRefProps>(null);

  const wrapForm = useMemo(() => {
    return (
      form ?? {
        ...defaultRef,
      }
    );
  }, [form, forRef]);

  return [forRef, forRef?.current ?? wrapForm];
}

export default useFormTera;
