import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product as ProductType } from "../../types/ElementTypes.d";

interface initialStateType {
    cart: ProductType[],
    total: number
}

const initialState: initialStateType = {
    cart: JSON.parse(localStorage.getItem("cart") as string) || [],
    total: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductType> ) => {
            const productExistIndex = state.cart.findIndex((product) => product._id === action.payload._id && product.selectedVariant.variant_value === action.payload.selectedVariant.variant_value);
            if(productExistIndex === -1){
                state.cart = [...state.cart, action.payload]
                state.total += action.payload.selectedVariant.variant_sale_price
            }
            else{
                state.cart[productExistIndex].count += 1
                state.total += action.payload.selectedVariant.variant_sale_price
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeFromCart: (state, action: PayloadAction<ProductType>) => {
            const productExistIndex = state.cart.findIndex((product) => product._id === action.payload._id && product.selectedVariant.variant_value === action.payload.selectedVariant.variant_value);
            state.cart[productExistIndex].count -= 1
            state.total -= action.payload.selectedVariant.variant_sale_price
            if(state.cart[productExistIndex].count ===0 ){
                state.cart.splice(productExistIndex, 1)
            }
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer