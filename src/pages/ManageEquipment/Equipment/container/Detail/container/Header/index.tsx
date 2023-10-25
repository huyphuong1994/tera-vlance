import { ArrowSmallLeftSolid, Breadcrumb, ItemType } from 'tera-dls';
import { useNavigate } from 'react-router-dom';
import { MANAGE_PAGE_URL } from '../../../../../../../_common/constants/url';

function EquipmentDetailHeader() {
  const navigate = useNavigate();

  const breadcrumbItem: ItemType[] = [
    {
      title: (
        <a
          className="cursor-pointer"
          onClick={() => navigate(`${MANAGE_PAGE_URL.list.path}`)}
        >
          Danh sách thiết bị
        </a>
      ),
    },
    {
      title: 'Chi tiết thiết bị',
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="p-3 page-header__breadcrumb">
          <div
            className="cursor-pointer page-header__breadcrumb-back"
            onClick={() => navigate(-1)}
          >
            <ArrowSmallLeftSolid width={24} height={24} />
          </div>
          <Breadcrumb separator={'>'} items={breadcrumbItem} />
        </div>

        {/*<div className="flex justify-between page-header__function">*/}
        {/*  <div className="flex gap-2.5">*/}
        {/*    <Button*/}
        {/*      type="danger"*/}
        {/*      className="page-header-btn"*/}
        {/*      onClick={() => handleDelete(tableId)}*/}
        {/*    >*/}
        {/*      Xóa*/}
        {/*      <XMarkOutlined width={'1rem'} height={'1rem'} />*/}
        {/*    </Button>*/}
        {/*    <Button*/}
        {/*      className="page-header-btn"*/}
        {/*      onClick={() =>*/}
        {/*        setFormModel({ open: true, id: Number(tableId) })*/}
        {/*      }*/}
        {/*    >*/}
        {/*      Sửa*/}
        {/*      <PencilSquareOutlined width={'1rem'} height={'1rem'} />*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*  <Dropdown*/}
        {/*    menu={{*/}
        {/*      items: itemsDropdown,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Button*/}
        {/*      type="alternative"*/}
        {/*      icon={<AdjustmentsHorizontalOutlined />}*/}
        {/*    />*/}
        {/*  </Dropdown>*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default EquipmentDetailHeader;
