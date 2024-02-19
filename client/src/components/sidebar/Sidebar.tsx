import "./Sidebar.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import validateToken from "../../helpers/validation/token";
import { logOut } from "../../redux/features/authSlice";
import logo from "../../assets/nike.svg";
import { FiHeart, FiPackage, FiUserCheck, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const validation = validateToken(useSelector((state:RootState) => state.auth.token));

  const handleLogOut = () => {
    const userAgree = confirm("Are you sure to log out?");

    if(userAgree){
      dispatch(logOut());
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={logo} alt="" />
        <h2>Dashboard</h2>
      </div>
        <ul className="sidebar__list">
          {validation.decoded && validation.decoded.user.role === "admin" ?
           <>
              <li><NavLink end className={({isActive}) => isActive ? "sidebar-link sidebar-link--active" : "sidebar-link" } to="/dashboard"> <FiPackage/> Manage Products</NavLink></li>
              <li><NavLink className={({isActive}) => isActive ? "sidebar-link sidebar-link--active" : "sidebar-link" } to="/dashboard/manage-admin"> <FiUserCheck/> Manage Admins</NavLink></li>
           </>
           :
           <>
            <li><NavLink end className={({isActive}) => isActive ? "sidebar-link sidebar-link--active" : "sidebar-link" } to="/profile"> <FiUser/> Profile</NavLink></li>
           </>
          }
            <li><NavLink className={({isActive}) => isActive ? "sidebar-link sidebar-link--active" : "sidebar-link" } to={`/${validation.decoded?.user.role === "admin" ? "dashboard" : "profile"}/liked`}> <FiHeart/> Liked</NavLink></li>
        </ul>
          <br />
        <button className="link" onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default Sidebar