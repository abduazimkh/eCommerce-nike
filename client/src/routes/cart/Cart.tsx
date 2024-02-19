import { useSelector, useDispatch } from "react-redux"
import {RootState }from "../../redux/store";
import { Product } from "../../types/ElementTypes.d";
import { SmallContainer } from "../../utils/Utils";
import { removeFromCart } from "../../redux/features/cartSlice";
import validateToken from "../../helpers/validation/token";
// import axios from "../../api/axios"
import "./Cart.scss"
import { useState } from "react";

const Cart = () => {

  const [isLoading, setIsLoading ] = useState<boolean>(false)
  const auth = useSelector((state: RootState) => state.auth.token)
  const validation = validateToken(auth);
  const dispatch = useDispatch();
    const {cart} =useSelector((state:RootState) => state.cartRoot);

    const handleRemoveFromCart = (cartItem: Product) => {
        dispatch(removeFromCart(cartItem))
    }

    //  const addToWishlist = (product_id: string) => {
    //   if(!auth){
    //     alert("Please login first");
    //   }
    //   else{
    //     setIsLoading(true)
    //     axios.patch(`/product/${product_id}/like`)
    //       .then(response => {
    //         if(response.data){
    //           // setIsLiked(true);
    //         }
    //       })
    //       .catch(error => console.log(error))
    //       .finally(() => {setIsLoading(false)})
    //   }
    // }

  return (
    <div className="cart">
      <SmallContainer>
      <h1>Cart</h1>
          {
            cart.map((cartItem:Product) => 
              <div className="cart-item" key={cartItem._id}>
                <img width={200} src={cartItem.product_images[0]} alt="" />
               <div>
                  <div>
                    <p>{cartItem.product_name}</p>
                    <p>Type: {`${cartItem.category}'s`} {cartItem.product_type}</p>
                    <p>Size: {cartItem.selectedVariant.variant_value}</p>
                    <p>Quantity: {cartItem.count}</p>
                  </div>
                  <div className="cart-item__actions">
                    {cartItem.likedby.includes(validation.decoded?.user.email) ? <button disabled={isLoading}  onClick={() => removeFromWishlist(productData._id)} className="link link--light">Remove from wishlist</button>  : <button disabled={isLoading}  onClick={() => addToWishlist(productData._id)} className="link link--light">Add to wishlist</button> }
                    <button className="link link--dark" onClick={() => handleRemoveFromCart(cartItem)}>Remove from Cart</button>
                  </div>
                </div>
              </div>  
            )
          }
      </SmallContainer>
    </div>
  )
}

export default Cart