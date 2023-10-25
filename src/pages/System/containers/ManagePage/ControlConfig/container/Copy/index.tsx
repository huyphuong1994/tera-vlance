import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messageError, messageWarning } from '_common/constants/message';
import SelectPageConfig from '_common/dof/Select/SelectPageConfig';
import useConfirm from '_common/hooks/useConfirm';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem, Modal, OptionProps, notification } from 'tera-dls';
import * as yup from 'yup';
import ControlConfigApi from '../../_api';
import { FormCopyControl, RequestCopyControl } from '../../interfaces';
import SelectControlConfig from '_common/dof/Select/SelectControlConfig';
const schema = yup
  .object()
  .shape({
    page_target_id: yup.number().required('Vui lòng chọn trường này!'),
    control_selected: yup.array().min(1, 'Vui lòng chọn trường này!'),
  })
  .required();
interface CopyControlConfigProps {
  open: boolean;
  onClose: () => void;
  pageId: number;
}
const CopyControlConfig = ({
  onClose,
  open,
  pageId,
}: CopyControlConfigProps) => {
  const confirm = useConfirm();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormCopyControl>({
    resolver: yupResolver<FormCopyControl>(schema),
    mode: 'onChange',
    defaultValues: {
      page_target_id: null,
      control_selected: [],
    },
  });
  const [selectedControl, setSelectedControl] = useState<OptionProps[]>([]);
  const queryClient = useQueryClient();

  const handleClose = () => {
    onClose();
    reset();
  };

  const { mutate: mutateCopyControl } = useMutation(
    (variables: RequestCopyControl) => {
      return ControlConfigApi.copy(variables);
    },
    {
      onSuccess: (res) => {
        if (res?.code === 200) {
          queryClient.invalidateQueries(['get-list-control-config']);
          handleClose();
          notification.success({
            message: res?.msg,
          });
        }
      },
      onError: (error: any) => {
        const errorMessage = error?.data?.msg || messageError.ERROR_API;
        notification.error({ message: errorMessage });
      },
    },
  );

  const onCloseModal = () => {
    if (isDirty) {
      confirm.warning({
        title: 'Thoát bản ghi',
        content: (
          <>
            <p>{messageWarning.WARNING_EXIT_1}</p>
            <p>{messageWarning.WARNING_EXIT_2}</p>
          </>
        ),
        onOk: () => {
          handleClose();
        },
      });
    } else handleClose();
  };

  const handleSubmitForm = (values: FormCopyControl) => {
    mutateCopyControl({
      ...values,
      control_selected: values.control_selected.includes('all')
        ? 'all'
        : values.control_selected,
      page_id: pageId,
    });
  };

  return (
    <Modal
      title="Sao chép control"
      okText="Lưu"
      cancelText="Hủy"
      width="20vw"
      open={open}
      onCancel={onCloseModal}
      onOk={() => handleSubmit(handleSubmitForm)()}
      closeIcon={false}
    >
      <Form>
        <FormItem
          label="Chọn trang nguồn"
          isError={!!errors.page_target_id}
          messages={errors?.page_target_id?.message}
        >
          <Controller
            control={control}
            name="page_target_id"
            render={({ field }) => (
              <SelectPageConfig
                {...field}
                onChangeCustom={() => setSelectedControl([])}
                paramsApi={{ page_id: pageId }}
                placeholder="Vui lòng chọn"
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Chọn cấu hình control"
          isError={!!errors.control_selected}
          messages={errors?.control_selected?.message}
        >
          <Controller
            control={control}
            name="control_selected"
            render={({ field }) => (
              <SelectControlConfig
                {...field}
                isCheckAll
                mode="multiple"
                selectedValue={selectedControl}
                disabled={!watch('page_target_id')}
                onClear={() => setSelectedControl([])}
                onSelect={(value: OptionProps[]) => {
                  setSelectedControl(value);
                }}
                paramsApi={{ page_id: watch('page_target_id') }}
              />
            )}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CopyControlConfig;
