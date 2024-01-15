
import "./Navigation.scss"
import { Container } from "../../utils/Utils"
import {Link} from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/nike.svg"
import { useState } from "react";

const Navigation = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  return (
    <nav className="navigation">
        <Container>
          <div className="navigation__wrapper">
              <Link to="/" className="navigation-logo">
                <img src={logo} alt="" />
              </Link>
              <ul className="navigation__list">
                <li><Link to="/featured">New & Featured</Link></li>
                <li><Link to="/men">Men</Link></li>
                <li><Link to="/women">Women</Link></li>
                <li><Link to="/kids">Kids</Link></li>
              </ul>
              <div className="navigation__actions">
                <div className={`search-panel ${isSearchActive ? "search-panel--active" : ""}`}>
                  <div className="search__wrapper">
                    <button className="search-icon" onClick={() => setIsSearchActive(true)}>
                      <FiSearch/>
                    </button>
                    <input className="search-input" type="text"  placeholder="Search"/>
                  </div>
                  <button onClick={() => setIsSearchActive(false)}>Cancel</button>
                </div>
              </div>
          </div>
        </Container>
    </nav>
  )
}

export default Navigation
