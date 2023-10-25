import { InboxOutlined } from 'tera-dls';

function NoData() {
  return (
    <div className="h-full w-full flex">
      <div className="m-auto flex flex-col gap-y-2 items-center">
        <InboxOutlined className="h-[50px] w-[50px]" />
        <p>Không tìm thấy dữ liệu</p>
      </div>
    </div>
  );
}

export default NoData;
