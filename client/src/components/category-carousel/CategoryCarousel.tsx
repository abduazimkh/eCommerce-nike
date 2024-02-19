import { Category } from "../../types/ElementTypes.d";
import useFetch from "../../helpers/hooks/useFetch";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './CategoryCarousel.scss';

// import required modules
import { Keyboard, Scrollbar } from 'swiper/modules';
import { NavigationBnts } from "../../utils/Utils";

const CategoryCarousel = () => {

    const {data} = useFetch("/category");
    const categoryCarouselData: Category[] = data;

    return (
        <div className="category-carousel">
          
            <Swiper 
                    slidesPerView={3}
                    keyboard={{
                      enabled: true,
                    }}
                    spaceBetween={20}
                    scrollbar={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Keyboard, Scrollbar]}
                    className="mySwiper"
            >
                <NavigationBnts/>
                {
                    categoryCarouselData.map((category) =>
                        <SwiperSlide key={category._id}>
                            <img src={category.category_image} alt="" />
                            <h4>{category.category_name}</h4>
                           <div>
                           <Link to="/">Shop</Link>
                           </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default CategoryCarousel