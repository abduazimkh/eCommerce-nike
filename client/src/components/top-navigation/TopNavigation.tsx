import "./TopNavigation.scss";
import { SiJordan } from "react-icons/si";
import { GiConverseShoe } from "react-icons/gi";
import {Container} from "../../utils/Utils";
import {Link} from "react-router-dom";
import validateToken from "../../helpers/validation/token";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TopNavigation = () => {
    const auth = useSelector((state: RootState) => state.auth.token)
    const validation = validateToken(auth);
  return (
    <nav className="top-navigation">
        <Container>
            <div className="top-navigation__wrapper">
                <div className="logo-wrapper">
                    <Link to='/'>
                        <SiJordan/>
                    </Link>
                    <Link to='/'>
                        <GiConverseShoe/>
                    </Link>
                </div>
                <ul className="top-navigation__list">
                    <li><Link to='/'>Find a Store</Link></li>
                    <li><Link to='/help'>Help</Link></li>
                    <li><Link to='/join'>Join Us</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                    <li><Link to='/cart'>Cart</Link></li>
                    <li><Link to={`/${validateToken(auth).decoded?.user.role === "admin" ? "dashboard" : "profile"}/liked`}>Liked</Link></li>
                </ul>
            </div>
        </Container>
    </nav>
  )
}

export default TopNavigation