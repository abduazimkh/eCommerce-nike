import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./home/Home";
import TopNavigation from "../components/top-navigation/TopNavigation";
import Product from "./product/Product";
import Navigation from "../components/navigation/Navigation";
import { useEffect, createRef, useState, useLayoutEffect } from "react";
import { Route as RouteType } from "../types/ElementTypes.d";
import Cart from "./cart/Cart";
import Join from "./auth/join/Join";
import SignIn from "./auth/sign-in/SignIn";
import ManageProduct from "./dashboard/manage-product/ManageProduct";
import ManageAdmin from "./dashboard/manage-admin/ManageAdmin";
import Profile from "./profile/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import validateToken from "../helpers/validation/token";
import Category from "./category/Category";
import Private from "./private/Private";
import NotFound from "./not-found/NotFound";
import Liked from "./liked/Liked";


const RouteController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const mainElement = createRef<HTMLDivElement>();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [dropdown, setCurrentDropdown] = useState<RouteType[] | null>(null);

  const validation = validateToken(auth.token);

  useEffect(() => {
    if (mainElement.current) {
      if (dropdown || isSearchActive) {
        mainElement.current.style.filter = "blur(5px)";
      } else {
        mainElement.current.style.filter = "blur(0px)";
      }
    }
  }, [dropdown, isSearchActive]);

  useEffect(() => {
    if(!validation.decoded && (pathname.includes("dashboard") ||  pathname.includes("profile"))){
      navigate("/sign-in")

    }
    if(validation.decoded &&  validation.decoded.user.role === "user" && pathname.includes("dashboard")){
      navigate("/profile")
    }

    if(validation.decoded &&  validation.decoded.user.role === "admin" && pathname.includes("profile")){
      navigate("/dashboard")
    }
  }, [pathname])

  return (
    <>
      {pathname.includes("/dashboard") || pathname.includes("/profile") ? <></> : (
        <>
          <TopNavigation />
          <Navigation
            dropdown={dropdown}
            isSearchActive={isSearchActive}
            setIsSearchActive={setIsSearchActive}
            setCurrentDropdown={setCurrentDropdown}
          />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home ref={mainElement} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/join" element={<Join />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryname" element={<Category />} />
        {
         validation.decoded &&  validation.decoded.user.role === "admin" &&
         <Route path="/dashboard" element={<Private />}>
            <Route index element={<ManageProduct />} />
            <Route path="manage-admin" element={<ManageAdmin />} />
            <Route path="liked" element={<Liked />} />
        </Route>
        }
        {
          validation.decoded &&  validation.decoded.user.role === "user" &&
          <Route path="/profile" element={<Private />}>
              <Route index element={<Profile />} />
              <Route path="liked" element={<Liked />} />
          </Route>
        }
        <Route path="/product/:id" element={<Product ref={mainElement} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};

export default RouteController;
