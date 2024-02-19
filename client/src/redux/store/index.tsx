import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../features/cartSlice';
import AuthReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    cartRoot: CartReducer,
    auth: AuthReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch