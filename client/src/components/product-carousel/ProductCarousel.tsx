import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './ProductCarousel.scss';
import { Product } from '../../types/ElementTypes.d';

// import required modules
import { Navigation } from 'swiper/modules';
import useFetch from "../../helpers/hooks/useFetch"

const ProductCarousel = () => {
  const {data} = useFetch("/product/most-popular");
  const productCarouselData: Product[] = data;
    
  return (
        <div className='product-carousel'>
        <Swiper
            pagination={{
            type: 'fraction',
            }}
            loop={true}
            spaceBetween={20}
            centeredSlides={true}
            slidesPerView={3.50}
            navigation={true}
            modules={[ Navigation]}
            className="mySwiper"
        
        >
        {
            productCarouselData.map((product, index) => 
                <SwiperSlide key={product._id}>
                    <div className='current-slide-index'>{index + 1 + "/" + data.length}</div>
                    <Link to={`/product/${product._id}`}>
                      <img src={product.product_images[0]} alt="" />
                    </Link>
                </SwiperSlide>    
            )
        }
      </Swiper>
    </div>
  )
}

export default ProductCarousel