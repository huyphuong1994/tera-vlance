import EquipmentDetailHeader from './Header';
import EquipmentDetailInfo from './Infomation';
import { Tabs, Tag } from 'tera-dls';
import { useState } from 'react';
import EquipmentDetailFix from './Fix';
import EquipmentDetailManeuver from './Maneuver';
import EquipmentDetailRecords from './Records';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EquipmentPageApi from '../../../_api';
import { statusConfigColor, statusTextColor } from '../../../constants';
import EquipmentDetailDocument from './Document';

function EquipmentPageDetail() {
  const { equipmentId } = useParams();
  const [tab, setTab] = useState<string>('0');

  const {
    data: dataDetail,
    // refetch: refetchDetail,
    // isLoading: loadingDetail,
  } = useQuery(
    ['get-detail-equipment', equipmentId],
    () => EquipmentPageApi.getDetailEquipment(equipmentId),
    {
      enabled: !!equipmentId,
      staleTime: 300000,
      cacheTime: 300000,
    },
  );

  const tabs = [
    {
      key: '0',
      label: <div className="text-xxs">THÔNG TIN</div>,
    },
    {
      key: '1',
      label: <div className="text-xxs">SỬA CHỮA</div>,
    },
    {
      key: '2',
      label: <div className="text-xxs">ĐIỀU ĐỘNG</div>,
    },
    {
      key: '3',
      label: <div className="text-xxs">TÀI LIỆU</div>,
    },
    {
      key: '4',
      label: <div className="text-xxs">HỒ SƠ SỬA CHỮA</div>,
    },
  ];

  const handleChangeTabs = (key: string): void => setTab(key);

  return (
    <>
      <div className="tera-page-form">
        <EquipmentDetailHeader></EquipmentDetailHeader>
        <div className="bg-white shadow-xsm rounded-2xl">
          <div className="p-5">
            <div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <span className="uppercase text-xxs font-bold">
                    Tên thiết bị
                  </span>
                  <span className="text-gray-800 text-xxs leading-normal pl-5">
                    {dataDetail?.name}
                  </span>
                </div>
                <div className="text-start">
                  <span className="uppercase text-xxs font-bold">
                    Ngày trả máy
                  </span>
                  <span className="text-gray-800 text-xxs leading-normal pl-5">
                    {dataDetail?.return_expected_at}
                  </span>
                </div>
                <div className="text-end">
                  <span className="uppercase text-xxs font-bold">
                    <Tag color={statusConfigColor[dataDetail?.status]}>
                      <span className={statusTextColor[dataDetail?.status]}>
                        {dataDetail?.status_text}
                      </span>
                    </Tag>
                  </span>
                </div>
                <div>
                  <span className="uppercase text-xxs font-bold">
                    Mã thiết bị
                  </span>
                  <span className="text-gray-800 text-xxs leading-normal pl-5">
                    {dataDetail?.code}
                  </span>
                </div>
                <div className="text-start">
                  <span className="uppercase text-xxs font-bold">
                    Ngày hoàn thành
                  </span>
                  <span className="text-gray-800 text-xxs leading-normal pl-5">
                    {dataDetail?.return_expected_at}
                  </span>
                </div>
                <div className="text-end">
                  <div className="flex items-center justify-end">
                    <div>
                      <span className="uppercase text-xxs font-bold">
                        người tạo dự án
                      </span>
                    </div>
                    <div className="ml-5 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-300">
                        {/*<img*/}
                        {/*  src={'#'}*/}
                        {/*  className="object-cover w-6 h-6 rounded-full"*/}
                        {/*  alt="avatar-user"*/}
                        {/*/>*/}
                      </div>
                      <div className="text-gray-800 text-xxs ml-2.5">
                        <span>{dataDetail?.project_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Tabs
                activeKey={tab}
                className="mb-0"
                items={tabs}
                onChange={handleChangeTabs}
              />
              {tab == '0' && (
                <EquipmentDetailInfo
                  equipmentDetail={dataDetail}
                ></EquipmentDetailInfo>
              )}
              {tab == '1' && <EquipmentDetailFix></EquipmentDetailFix>}
              {tab == '2' && (
                <EquipmentDetailManeuver></EquipmentDetailManeuver>
              )}
              {tab == '3' && (
                <EquipmentDetailDocument></EquipmentDetailDocument>
              )}
              {tab == '4' && <EquipmentDetailRecords></EquipmentDetailRecords>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquipmentPageDetail;
