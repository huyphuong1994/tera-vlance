import { useMutation } from '@tanstack/react-query';
import { useStores } from '_common/hooks';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { AuthApi } from 'states/api';
import {
  ArrowRightOutlined,
  ChevronDownOutlined,
  Dropdown,
  FolderOpenOutlined,
  UserOutlined,
  notification,
} from 'tera-dls';

const User = observer(() => {
  const {
    authStore: { user, clear },
  } = useStores();

  const { mutate: onLogout } = useMutation(AuthApi.logout, {
    onSuccess: () => {
      clear();
    },
    onError: (error: any) => {
      clear();
      const errorMessage = error?.msg;

      notification.error({
        message: errorMessage,
      });
    },
  });

  console.log('user', user);

  const dropdownItems = [
    {
      key: 'myInfo',
      icon: <UserOutlined />,
      label: <Link to="/profit">Thông tin của tôi</Link>,
    },
    {
      key: 'mission',
      icon: <FolderOpenOutlined />,
      label: <a href="#">Nhiệm vụ</a>,
    },
    {
      key: 'task',
      icon: <FolderOpenOutlined />,
      label: <a href="#">Bảng công việc</a>,
    },
    {
      key: 'salary',
      icon: <FolderOpenOutlined />,
      label: <a href="#">Bảng lương nhân viên</a>,
    },
    {
      key: 'password',
      icon: <FolderOpenOutlined />,
      label: <a href="#">Đổi mật khẩu</a>,
    },
    {
      key: 'history',
      icon: <FolderOpenOutlined />,
      label: <a href="#">Lịch sử login</a>,
    },
    {
      key: 'logout',
      icon: <ArrowRightOutlined className="text-red-600" />,
      label: (
        <span onClick={() => onLogout()} className="text-red-600">
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items: dropdownItems }}>
      <div
        className="cursor-pointer ml-2.5 flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:p-0 md:flex-row md:gap-2.5 md:items-center md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        id="user-menu-button"
        data-dropdown-placement="bottom"
        aria-expanded="false"
      >
        <div className="w-6 h-6 rounded-full bg-gray-300">
          {/*<img*/}
          {/*  src={'#'}*/}
          {/*  className="object-cover w-6 h-6 rounded-full"*/}
          {/*  alt="avatar-user"*/}
          {/*/>*/}
        </div>

        <div className="flex items-center gap-2">
          <div>
            <h3 className="font-medium text-xxs leading-normal">
              {user?.username}
            </h3>
            <p className="text-[10px] text-gray-300">{user?.email}</p>
          </div>
          <ChevronDownOutlined className="w-5 h-5" />
        </div>
      </div>
    </Dropdown>
  );
});

export default User;
