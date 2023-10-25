import React, { useEffect, useRef, useState } from 'react';
// redux
import { useStores } from '_common/hooks';
// component
import {
  Col,
  getQueryParams,
  notification,
  Row,
  Spin,
  updateQueryParams,
} from 'tera-dls';
import backgroundImage from 'styles/images/uiNew/bg-form.png';
import vector1 from 'styles/images/uiNew/vector1.png';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthApi } from 'states/api';

const swiperArray = [
  {
    id: 1,
    image: vector1,
    text: 'Nâng cao hiệu quả hoạt động kinh doanh với Tera solutions',
  },
  {
    id: 2,
    image: vector1,
    text: 'Linh động ứng dụng theo yêu cầu doanh nghiệp',
  },
  {
    id: 3,
    image: vector1,
    text: 'Tích hợp công nghệ AI vào sản phẩm',
  },
];

const CheckAuthPage = () => {
  const navigate = useNavigate();
  const {
    authStore: { logo, auth_url, updateUser },
  } = useStores();
  const location = useLocation();
  const params: { [key: string]: any } = getQueryParams(location.search);

  const [loading, setLoading] = useState(true);

  const classCoverBox = 'h-[100vh] flex items-center justify-center bg-cover';
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const { mutate: onCheckAuth, isLoading } = useMutation(
    (variables) => AuthApi.checkAuth(variables),
    {
      onSuccess: (res) => {
        updateUser(res?.data);
        setLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 200);
      },
      onError: (error: any) => {
        setLoading(false);
        const errorMessage = error?.data?.msg ?? 'Error!! please try again!';
        notification.error({
          message: errorMessage,
        });
      },
    },
  );

  useEffect(() => {
    try {
      if (!auth_url) return;
      if (params?.client_id) {
        const parseReq = JSON.parse(params?.req);
        if (parseReq?.iv && !isLoading) {
          onCheckAuth(parseReq);
        }
      } else {
        const queryParams = updateQueryParams({
          module: 'hrm',
          callback: window.location.href,
        });

        window.open(`${auth_url}${queryParams}`, '_self');
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: error?.message || 'Lỗi bất thường trong quá trình login',
      });
    }
  }, [auth_url, isLoading, params?.client_id]);

  return (
    <div
      className={classCoverBox}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="container">
        <Spin spinning={isLoading || loading}>
          <div className="flex justify-center mb-10">
            <img
              src={logo}
              alt=""
              className="pt-16 pb-8 px-16 h-[100px] w-auto box-content"
            />
          </div>
          <Swiper
            className="quote"
            modules={[Pagination]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={true}
            loop
          >
            {swiperArray.map((item: any) => (
              <SwiperSlide className="quote__itm" key={item.id}>
                <Row className="w-full h-full justify-center">
                  <Col className="flex items-center">
                    <img src={item.image} alt="vector1" />
                  </Col>
                  <Col className="text-center h-6 text-3xl font-light">
                    <p className="quote__txt">{item.text}</p>
                  </Col>
                </Row>
              </SwiperSlide>
            ))}
          </Swiper>
        </Spin>
      </div>
    </div>
  );
};

export default CheckAuthPage;
