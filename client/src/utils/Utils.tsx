import "./Utils.scss"
import { Children } from "../types/ElementTypes.d"
import { useSwiper } from "swiper/react";
import prevBtn from "../assets/prev-btn.svg"
import nextBtn from "../assets/next-btn.svg"


const Container = ({children} : Children) => {
  return (
    <div className="container">
        {children}
    </div>
  )
}

const SmallContainer = ({children} : Children) => {
  return (
    <div className="small-container">
        {children}
    </div>
  )
}


const NavigationBnts = () => {
  const swiperInstance = useSwiper();

  return (
    <div className="navigation-carousel">
      <button onClick={() => swiperInstance.slidePrev()}>
        <img src={prevBtn} alt="" />
      </button>
      <button onClick={() => swiperInstance.slideNext()}>
        <img src={nextBtn} alt="" />
      </button>
    </div>
  )
}

export {Container, NavigationBnts, SmallContainer}