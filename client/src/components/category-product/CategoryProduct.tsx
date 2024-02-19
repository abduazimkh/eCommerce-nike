import { useEffect, useState, useRef, MutableRefObject } from 'react'
import { Product } from '../../types/ElementTypes.d'
import {truncate} from "../../helpers/modifier/truncate"

const CategoryProduct = ({product}:{product:Product}) => {
    const video = useRef() as MutableRefObject<HTMLVideoElement>;
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)
    const [limitProductImagesPreview, setLimitProductImagesPreview] = useState<number>(2)
    const [currentImage, setCurrentImage] = useState<number>(0);

    useEffect(() => {
        if(video.current){
            if(isVideoPlaying){
                video.current.play();
            }
            else{
                video.current.pause();
            }
        }
    }, [isVideoPlaying])

  return (
    <div className='category-product'>
    <div className='category-product__img-wrapper'>
      {
        product.product_images[currentImage].endsWith(".mp4") || product.product_images[currentImage].endsWith(".mov") ? 
            <video ref={video} onMouseLeave={() => setIsVideoPlaying(false)} onMouseOver={() => setIsVideoPlaying(true)} className='category-product__img' src={product.product_images[currentImage]} muted loop />
            :
         <img className='category-product__img' src={product.product_images[currentImage]} alt="" />
      }
     </div>
    <div className='category-product__content'>
      <p>{product.product_name}</p>
      <p>{truncate(product.description, 60)}</p>
      <p>{product.product_type}</p>
    </div>
    <div className='category-product__options'>
       <div className='category-product__options-images'>
           {
             product.product_images.slice(0, limitProductImagesPreview).map((img, index) => {
                if(img.endsWith(".mp4") || img.endsWith(".mov")){
                    return <video loop muted autoPlay onMouseOver={() => setCurrentImage(index)} width={50} height={50} src={img} />
                }
                else{
                  return  <img  onMouseOver={() => setCurrentImage(index)} width={50} height={50} src={img} alt="" />
                }
               }
             )
           }
           <>
           {product.product_images.length > limitProductImagesPreview ? <span onClick={() => setLimitProductImagesPreview(limitProductImagesPreview + (product.product_images.length - 2))}     className='category-product__options-images-count'>{"+" + (product.product_images.length - 2)}</span>  : null}
           </>
           
       </div>
       <p>$ {product.variants[0].variant_sale_price}</p>
     </div>
 </div>
  )
}

export default CategoryProduct