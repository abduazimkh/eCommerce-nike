import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect } from "react";
import { getUser } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import "../dashboard/Dashboard.scss";

const Private = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser())
  }, []);
  
 
  
  return (
    <div className='dashboard'>
        
        {
            auth.token ? 
            <>
                <Sidebar/>
                <Outlet/>
            </>
            :
            <Navigate to={"/sign-in"}/>
        }   
    </div>
  )
}

export default Private