import FormTera from '_common/dof/FormTera';
import React from 'react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const EditableRow: React.FC<any> = (props) => {
  const dataRowKey = props['data-row-key'];
  const { onUpdateData } = props;
  const form = useForm();
  const { control } = form;

  const watchedData = useWatch({ control });
  useEffect(() => {
    Object.keys(watchedData).length > 0 &&
      onUpdateData(dataRowKey, watchedData);
  }, [watchedData]);

  return <FormTera wrapper_type="table" form={form} isUpdate {...props} />;
};

export default React.memo(EditableRow);
