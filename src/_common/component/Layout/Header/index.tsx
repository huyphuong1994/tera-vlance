import { BellOutlined, EnvelopeOutlined, PhoneOutlined } from 'tera-dls';

import User from './User';

const Header = () => {
  const listIcon = [<PhoneOutlined />, <EnvelopeOutlined />, <BellOutlined />];
  const emailNotification = (key: number) => {
    if (key == 1) {
      return 'w-6 h-6 after:content-[10]';
    }

    if (key == 2) {
      return 'w-6 h-6 after:content-[10]';
    }

    return 'w-6 h-6';
  };

  return (
    <nav
      id="header"
      className="fixed z-[50] top-0 flex flex-wrap items-center justify-between w-full h-[40px] px-5 text-white bg-blue-600 dark:bg-gray-900"
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-300">
            {/*<img*/}
            {/*  src="#"*/}
            {/*  className="object-cover w-6 h-6 rounded-full"*/}
            {/*  alt="company-name"*/}
            {/*/>*/}
          </div>
          <div className="ml-2.5">
            <h3 className="uppercase text-sm font-bold leading-normal">
              Name company
            </h3>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="tera-header-menu"
        >
          <ul className="flex flex-row gap-2.5 dark:bg-gray-800 dark:border-gray-700">
            {listIcon &&
              listIcon.map((item, key) => (
                <li key={key} className={emailNotification(key)}>
                  <>{item}</>
                </li>
              ))}
          </ul>
          <User />
        </div>
      </div>
    </nav>
  );
};
export default Header;
