import { useMemo } from 'react';
import { Button, Description, Modal, Tag } from 'tera-dls';
import { statusFieldColor } from '../../../constants';
import { useQueries } from '@tanstack/react-query';
import { FieldConfigApi } from '../../../_api';

interface IDetailEmployeeGroup {
  id?: number;
  isOpen?: boolean;
  handleClose?: () => void;
}

const infoFieldColumn = [
  {
    key: 'code',
    value: '',
    name: 'Mã trường dữ liệu',
  },
  {
    key: 'title',
    value: '',
    name: 'Tiêu đề',
  },
  {
    key: 'type',
    value: '',
    name: 'Loại dữ liệu',
  },
  {
    key: 'key',
    value: '',
    name: 'Key dữ liệu',
  },
  {
    key: 'className',
    value: '',
    name: 'className',
  },
  {
    key: 'priority',
    value: '',
    name: 'Thứ tự đứng sau',
  },
  {
    key: 'placeholder',
    value: '',
    name: 'Placeholder',
  },
  {
    key: 'isEdit',
    value: '',
    name: 'Cho phép chỉnh sửa',
  },
  {
    key: 'isDisableEdit',
    value: '',
    name: 'Disable khi chỉnh sửa',
  },
  {
    key: 'isAdd',
    value: '',
    name: 'Cho phép thêm mới',
  },
  {
    key: 'isRequired',
    value: '',
    name: 'Bắt buộc',
  },
  {
    key: 'created_by',
    value: '',
    name: 'Người tạo',
  },
  {
    key: 'created_at',
    value: '',
    name: 'Ngày tạo',
  },
  {
    key: 'updated_by',
    value: '',
    name: 'Người cập nhật',
  },
  {
    key: 'updated_at',
    value: '',
    name: 'Ngày cập nhật',
  },
];

const DetailConfigField = ({
  id,
  isOpen,
  handleClose,
}: IDetailEmployeeGroup) => {
  console.log('id', id);
  const listConfig = ['isEdit', 'isDisableEdit', 'isAdd', 'isRequired'];
  const [{ data: detailFieldConfig }] = useQueries({
    queries: [
      {
        queryKey: ['detail_field_config'],
        queryFn: () => {
          return FieldConfigApi.getDetail(id);
        },
      },
    ],
  });

  // const optionsDayOff: OptionProps[] =
  //   Object.entries(listDayOff).map(([key, value]) => ({
  //     value: key,
  //     label: value,
  //   })) ?? [];

  const handleCancel = () => {
    handleClose();
  };

  //   useEffect(() => {
  //     if (id) {
  //       getLeaveDetail();
  //     }
  //   }, [id]);

  //   useEffect(() => {
  //     if (!!id && leaveDetail) {
  //       const values: IForm = {
  //         employee_info: leaveDetail?.employee?.id,
  //         info_onsite: DepartmentInfo(leaveDetail?.employee),
  //         employee_transfer: leaveDetail?.employee_transform?.id,
  //       };
  //       Object.entries(values).forEach(([fieldName, fieldValue]: [any, any]) => {
  //         setValue(fieldName, fieldValue);
  //         if (fieldName === 'file_uploads') {
  //           setFileList(fieldValue);
  //         }
  //       });
  //       setEmployeeSelected(getInfoEmployee(leaveDetail?.employee));
  //       setEmployeeTransfer(getInfoEmployee(leaveDetail?.employee_transform));
  //     }
  //   }, [leaveDetail, id]);

  const infoFieldData = useMemo(() => {
    const convertData = {
      code: detailFieldConfig?.code,
      title: detailFieldConfig?.title,
      type: detailFieldConfig?.type_field?.title,
      key: detailFieldConfig?.key_data,
      className: detailFieldConfig?.class_name,
      priority: detailFieldConfig?.item_prev_order?.title,
      placeholder: detailFieldConfig?.place_holder,
      isEdit: {
        key: detailFieldConfig?.is_edit,
        text: detailFieldConfig?.is_edit_text,
      },
      isDisableEdit: {
        key: detailFieldConfig?.disable_edit,
        text: detailFieldConfig?.disable_edit_text,
      },
      isAdd: {
        key: detailFieldConfig?.is_create,
        text: detailFieldConfig?.is_create_text,
      },
      isRequired: {
        key: detailFieldConfig?.is_required,
        text: detailFieldConfig?.is_required_text,
      },
      created_by: detailFieldConfig?.employee_created?.full_name,
      created_at: detailFieldConfig?.created_at_format,
      updated_by: detailFieldConfig?.employee_updated?.full_name,
      updated_at: detailFieldConfig?.employee_updated
        ? detailFieldConfig?.updated_at_format
        : '',
    };
    const dataRender = infoFieldColumn.map((info) => ({
      ...info,
      value: convertData ? convertData[info?.key] : '',
    }));

    return dataRender;
  }, [detailFieldConfig]);

  return (
    <>
      <Modal
        centered={true}
        title={'Chi tiết trường dữ liệu'}
        open={isOpen}
        onCancel={handleCancel}
        onOk={null}
        footer={<Button onClick={handleCancel}>Đóng</Button>}
        closeIcon={false}
        okText="Lưu"
        cancelText="Huỷ"
        className="sm:w-[50%] md:w-[50%] lg:w-[30%]"
        destroyOnClose
      >
        {infoFieldData.map((info) => {
          if (listConfig.includes(info?.key)) {
            return (
              <Description key={info?.key} label={info?.name}>
                <Tag color={statusFieldColor[info?.value?.key]}>
                  {info?.value?.text}
                </Tag>
              </Description>
            );
          }
          return (
            <Description key={info?.key} label={info?.name}>
              {info.value}
            </Description>
          );
        })}
      </Modal>
    </>
  );
};

export default DetailConfigField;
