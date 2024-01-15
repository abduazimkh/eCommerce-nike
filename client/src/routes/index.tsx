import { Routes, Route } from 'react-router-dom'
import Home from "./home/Home";
import Navigation from '../components/navigation/Navigation';
import TopNavigation from '../components/top-navigation/TopNavigation';

const RouteController = () => {
  return (
    <>
        <TopNavigation/>
        <Navigation/>
        <Routes>
            <Route>
                <Route path='/' element={<Home/>}/>
                <Route path='/sign-in' element={<div>Sign In</div>}/>
                <Route path='/join-us' element={<div>Join Us</div>}/>
            </Route>
        </Routes>
    </>
  )
}

export default RouteController