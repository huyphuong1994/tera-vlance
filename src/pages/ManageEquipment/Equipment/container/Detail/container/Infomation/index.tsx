import { formatNumber } from '../../../../../../../_common/utils';

interface IEquipmentDetailProps {
  equipmentDetail: any;
}

function EquipmentDetailInfo({ equipmentDetail }: IEquipmentDetailProps) {
  console.log(equipmentDetail);
  return (
    <>
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-gray-200 rounded-l-[3px] p-2.5 border-l-2 border-blue-600">
              <span className="uppercase text-gray-800 text-xxs font-medium">
                thông tin chung
              </span>
            </div>
            <div className="mt-5">
              <ul className="grid gap-2.5">
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Vị trí hiện tại
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.attribute
                      ? equipmentDetail?.attribute
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Nhóm thiết bị
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.group_equipment?.title
                      ? equipmentDetail?.group_equipment?.title
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Đặc tính
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.attribute
                      ? equipmentDetail?.attribute
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Nơi sản xuất
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.made_in
                      ? equipmentDetail?.made_in
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Năm sản xuất
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.made_at
                      ? equipmentDetail?.made_at
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Năm sử dụng
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.used_at
                      ? equipmentDetail?.used_at
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Nguyên giá
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.origin_value
                      ? formatNumber(equipmentDetail?.origin_value)
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Giá trị còn lại
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.remain_value
                      ? formatNumber(equipmentDetail?.remain_value)
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Khấu hao
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.origin_value
                      ? formatNumber(
                          equipmentDetail?.origin_value -
                            equipmentDetail?.remain_value,
                        )
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Đơn vị khấu hao
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.depreciation_unit
                      ? equipmentDetail?.depreciation_unit
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Ngày trả máy
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.return_expected_at
                      ? equipmentDetail?.return_expected_at
                      : '-----'}
                  </div>
                </li>
                <li className="grid grid-cols-6 gap-5">
                  <div className="col-span-1 text-xxs text-gray-800 font-semibold	">
                    Ngày chờ việc
                  </div>
                  <div className="col-span-5">
                    {equipmentDetail?.wait_work_at
                      ? equipmentDetail?.wait_work_at
                      : '-----'}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 rounded-l-[3px] p-2.5 border-l-2 border-blue-600">
              <span className="uppercase text-gray-800 text-xxs font-medium">
                lịch sử hoạt động
              </span>
            </div>
            <div className="mt-5">
              <ul className="grid gap-5">
                <li className="grid gap-5">
                  <div className="flex items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        dd/mm/yyyy
                      </span>
                    </div>
                    <div className="border-b w-full ml-2.5 border-gray-400"></div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div>
                        <span>13:20</span>
                      </div>
                      <div className="ml-3">
                        <ul className="grid gap-[5px]">
                          <li className="text-xxs text-green-500 font-semibold">
                            Nguyễn Văn A
                          </li>
                          <li className="text-xxs text-gray-500">
                            hành động ghi nhận
                          </li>
                          <li className="text-xxs text-gray-800">
                            Mục tiêu được đề cập
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="grid gap-5">
                  <div className="flex items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        dd/mm/yyyy
                      </span>
                    </div>
                    <div className="border-b w-full ml-2.5 border-gray-400"></div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div>
                        <span>13:20</span>
                      </div>
                      <div className="ml-3">
                        <ul className="grid gap-[5px]">
                          <li className="text-xxs text-green-500 font-semibold">
                            Nguyễn Văn A
                          </li>
                          <li className="text-xxs text-gray-500">
                            hành động ghi nhận
                          </li>
                          <li className="text-xxs text-gray-800">
                            Mục tiêu được đề cập
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="grid gap-5">
                  <div className="flex items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        dd/mm/yyyy
                      </span>
                    </div>
                    <div className="border-b w-full ml-2.5 border-gray-400"></div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div>
                        <span>13:20</span>
                      </div>
                      <div className="ml-3">
                        <ul className="grid gap-[5px]">
                          <li className="text-xxs text-green-500 font-semibold">
                            Nguyễn Văn A
                          </li>
                          <li className="text-xxs text-gray-500">
                            hành động ghi nhận
                          </li>
                          <li className="text-xxs text-gray-800">
                            Mục tiêu được đề cập
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="grid gap-5">
                  <div className="flex items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        dd/mm/yyyy
                      </span>
                    </div>
                    <div className="border-b w-full ml-2.5 border-gray-400"></div>
                  </div>
                  <div>
                    <div className="flex items-start">
                      <div>
                        <span>13:20</span>
                      </div>
                      <div className="ml-3">
                        <ul className="grid gap-[5px]">
                          <li className="text-xxs text-green-500 font-semibold">
                            Nguyễn Văn A
                          </li>
                          <li className="text-xxs text-gray-500">
                            hành động ghi nhận
                          </li>
                          <li className="text-xxs text-gray-800">
                            Mục tiêu được đề cập
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquipmentDetailInfo;
