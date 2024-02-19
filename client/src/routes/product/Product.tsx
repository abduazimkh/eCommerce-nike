import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../redux/store"
import { addToCart, removeFromCart } from "../../redux/features/cartSlice";
import { Product as ProductType, ProductVariant } from "../../types/ElementTypes.d";
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "../../api/axios";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { NavigationBnts } from "../../utils/Utils";
import './Product.scss'
import validateToken from "../../helpers/validation/token";
import { Avatar } from 'antd';
import { SmallContainer } from "../../utils/Utils";

const Product = forwardRef<HTMLDivElement>((_, mainElement) => {

  const auth = useSelector((state: RootState) => state.auth.token)
  const validation = validateToken(auth);
  const {cart} = useSelector((state: RootState) => state.cartRoot);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { data } = useFetch(`/product/${id}?liked=${isLiked}`)
  const productData: ProductType = data[0];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToCart = (product: ProductType) : void =>  {
    if(currentVariant){
      let p = {...product};
      p = {...p, count: 1, selectedVariant: currentVariant};
      dispatch(addToCart(p))
    }
    else{
      console.log("Please select the variant");
    }
  }

  const handleRemoveFromCart = (product: ProductType) : void =>  {
    if(currentVariant){
      let p = {...product};
      p = {...p, selectedVariant: currentVariant};
      dispatch(removeFromCart(p))
    }
    else{
      console.log("Please select the variant");
    }
  }

  const addToWishlist = (product_id: string) => {
    if(!auth){
      alert("Please login first");
    }
    else{
      setIsLoading(true)
      axios.patch(`/product/${product_id}/like`)
        .then(response => {
          if(response.data){
            setIsLiked(true);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {setIsLoading(false)})
    }
  }

  const removeFromWishlist = (product_id: string) => {
    if(!auth){
      alert("Please login first");
    }
    else{
      setIsLoading(true)
      axios.patch(`/product/${product_id}/unlike`)
        .then(response => {
          if(response.data){
            setIsLiked(false);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {setIsLoading(false)})
    }
  }

  useEffect(() => {
    setCurrentVariant(productData?.variants[0])
  }, [productData])

  return <div className="single-product" ref={mainElement}>
    <SmallContainer>
    {
        productData &&
        <div className="single-carousel">
          <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
                    productData.product_images.map((img, index) =>
                        <SwiperSlide  key={index}>
                            <img src={img} alt="" />
                        </SwiperSlide>
                    )
                }
      </Swiper>
           <div className="single-carousel__main">
            <Swiper 
            slidesPerView={1}
                  spaceBetween={10}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper2"
              >
                  <NavigationBnts/>
                  {
                      productData.product_images.map((img, index) =>
                          <SwiperSlide key={index}>
                              <img className="swiper-main-image" src={img} alt="" />
                          </SwiperSlide>
                      )
                  }
              </Swiper>
           </div>
           <div className="product-actions">
            <h1>{productData.product_name}</h1>
            <p>{productData.description}</p>
            <div className="variants"> 
            <h5>{productData?.variants[0].variant_type}</h5>
              <div className="variants__wrapper">
              {
                productData?.variants.map((variant, index) => 
                  <div onClick={() => setCurrentVariant(variant)} className={`product-variant product-variant${currentVariant?.variant_value === variant.variant_value ? "-active" : ""}`} key={index}>{variant.variant_value}</div>  
                )
              }
              </div>
            </div>
            {
              cart.findIndex((product) => product._id === productData._id && product.selectedVariant.variant_value === currentVariant?.variant_value) === -1 ? 
              <button className="link" disabled={!productData} onClick={() => handleAddToCart(productData)}>Add To Cart</button>
              :
              <div className="add-to-cart-wrapper">
                <button onClick={() => handleRemoveFromCart(productData)} className="link">-</button>
                {cart.find((product) => product._id === productData._id && product.selectedVariant.variant_value === currentVariant?.variant_value)?.count}
                <button className="link" onClick={() => handleAddToCart(productData)}>+</button>
              </div> 
            }
            <div>
            <div className="likedby-wrapper">
              {productData.likes > 0 && "Liked by "}
            <Avatar.Group
              maxCount={2}
              size="small"
            >
              {
                [...productData.likedby].reverse().map(likedUser => {
                  if(likedUser !== validation.decoded?.user.email){
                    return <Avatar key={likedUser} style={{ backgroundColor: '#f56a00' }}>{likedUser[0].toUpperCase()}</Avatar>
                  }
                }
                )
              }        
            </Avatar.Group>
            {productData.likedby.includes(validation.decoded?.user.email) && ` ${productData.likes === 1 && productData.likedby.includes(validation.decoded?.user.email) ? "" : "and"} you`}
            </div>
             {productData.likedby.includes(validation.decoded?.user.email) ? <button disabled={isLoading}  onClick={() => removeFromWishlist(productData._id)} className="link link--light">Remove from wishlist</button>  : <button disabled={isLoading}  onClick={() => addToWishlist(productData._id)} className="link link--light">Add to wishlist</button> }
            </div>
           </div>
        </div>
    }
    
      </SmallContainer>
  </div>;
});

export default Product;
