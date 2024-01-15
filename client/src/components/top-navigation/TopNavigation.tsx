import "./TopNavigation.scss";
import { SiJordan } from "react-icons/si";
import { GiConverseShoe } from "react-icons/gi";
import {Container} from "../../utils/Utils";
import {Link} from "react-router-dom";

const TopNavigation = () => {
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
                    <li><Link to='/join-us'>Join Us</Link></li>
                    <li><Link to='/sign-in'>Sign In</Link></li>
                </ul>
            </div>
        </Container>
    </nav>
  )
}

export default TopNavigation