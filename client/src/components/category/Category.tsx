import categoryImg from "../../assets/category.jpg";
import categoryVideo from "../../assets/nike-com.mp4";
import { MutableRefObject, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Category.scss"

const Category = () => {
    const video = useRef() as MutableRefObject<HTMLVideoElement>;

    useEffect(() => {
        video.current.playbackRate = 0.7
    }, [])
  return (
        <div className='category'>
            <div className="category-item">
                <Link to="/">
                    <img src={categoryImg} alt="" />
                    <div className="category-content">
                        <p>Trending now</p>
                        <h4>The latest Air Force One's</h4>
                        <p className="link">Shop</p>
                    </div>
                </Link>
            </div>
            <div className="category-item">
              <Link  to="/">
                <video ref={video} muted autoPlay loop src={categoryVideo}></video>
                <div className="category-content">
                    <p>Invincible 3</p>
                    <h4>Take Cushion for Run</h4>
                    <p className="link link--light">Shop</p>
                </div>
              </Link>
            </div>
        </div>
  )
}

export default Category