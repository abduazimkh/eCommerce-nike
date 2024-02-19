import hero from "../../assets/men-s-shoes-clothing-accessories.jpg"
import { Container } from "../../utils/Utils";
import { Link } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
  return (
   <Container>
        <div className='hero'> 
            <nav className="hero__navigation">
                <h1 className="hero-category">Men</h1>
                <ul className="hero-list">
                    <li className="hero-list-item">
                        <Link to="/">Shoes</Link>
                    </li>
                    <li className="hero-list-item">
                        <Link to="/">Clothing</Link>
                    </li>
                    <li className="hero-list-item">
                        <Link to="/">Accessories</Link>
                    </li>
                    <li className="hero-list-item">
                        <Link to="/">Sale</Link>
                    </li>
                </ul>
            </nav> 
           <Link to="/">
             <img className="hero__image" src={hero} alt="" />
           </Link>
           <div className="hero__content">
                <h3>THE RESOLUTIONS STARTER PACK</h3>
                <p>Get after your fitness goals with a curated collection of comfy kicks, lightweight tops, and more supportive styles.</p>
                <Link className="link" to="/">Shop</Link>
           </div>
        </div>
   </Container>
  )
}

export default Hero