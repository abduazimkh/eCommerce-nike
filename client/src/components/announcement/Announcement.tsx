import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Announcement.scss";
import { Autoplay } from "swiper/modules";

const Announcement = () => {
  return (
    <div className="announcement-bar">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        allowTouchMove= {false}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>Buy with up to 50% discount</SwiperSlide>
        <SwiperSlide>Get extra one product for over $300 purchase</SwiperSlide>
        <SwiperSlide>Free delivery on all orders</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Announcement;
