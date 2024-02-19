import "./Navigation.scss"
import { memo } from "react";
import { Container } from "../../utils/Utils"
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/nike.svg"
import { useRef } from "react";
import navdata from "../../db/navigation-data.json";
import { Route } from "../../types/ElementTypes.d";

const Navigation = ({dropdown, setCurrentDropdown, isSearchActive, setIsSearchActive} : {dropdown: Route[] | null, setCurrentDropdown: any, isSearchActive: boolean, setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const searchPanel = useRef<HTMLDivElement | null >(null);
  return (
    <nav className="navigation">
        <Container>
          <div className="navigation__wrapper">
              <Link to="/" className="navigation-logo">
                <img src={logo} alt="" />
              </Link>
              <ul className="navigation__list">
                {
                  navdata.map((navitem, index) => 
                    <li onMouseOver={() => setCurrentDropdown(navitem.sub_routes)} onMouseLeave={() => setCurrentDropdown(null)} key={index}>
                      <Link to={navitem.link}>{navitem.title}</Link>
                     {
                      dropdown && 
                      <div className="navigation-dropdown">
                      <div className="dropdown__wrapper">
                      {
                        dropdown?.map((subroute, index) => 
                          <div key={index} className="sub-route-list">
                            <h2>{subroute.sub_title}</h2>  

                            <ul>
                                {
                                  subroute.sub_links.map((sublink, index) => 
                                    <li key={index}>
                                      <Link to={sublink.link}>{sublink.sub_link_title}</Link>  
                                    </li>
                                  )
                                }
                            </ul>
                          </div>
                        )
                      }
                      </div>
                    </div>
                     }
                    </li>
                  )
                }
              </ul>
              <div className="navigation__actions">
                <div className={`search-panel ${isSearchActive ? "search-panel--active" : ""}`}>
                  <img src={logo} alt="" />
                  <div className="search">
                    <div ref={searchPanel} className="search__wrapper">
                        <button className="search-icon" onClick={() => setIsSearchActive(true)}>
                          <FiSearch/>
                        </button>
                        <input className="search-input" type="text"  placeholder="Search"/>
                      </div>
                      <div className="search-suggestion">
                        <p className="suggestion__label">Popular search terms</p>
                        <ul className="suggestion__list">
                          <li className="suggestion__list-item">
                            <a href="/">Air Force 1</a>
                          </li>
                          <li className="suggestion__list-item">
                            <a href="/">Jordan</a>
                          </li>
                          <li className="suggestion__list-item">
                            <a href="/">Air Max</a>
                          </li>
                          <li className="suggestion__list-item">
                            <a href="/">Blazer</a>
                          </li>
                        </ul>
                      </div>
                  </div>
                  <button className="cancel-search" onClick={() => {
                    setIsSearchActive(false)
                    searchPanel.current?.classList.add("search__wrapper--inactive")
                  }}>Cancel</button>
                </div>
              </div>
          </div>
        </Container>
    </nav>
  )
}

export default memo(Navigation)
