import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer" style={{background: '#000'}}>
            <div className="container">
                <div className="top">
                    <div className="socialMedia">
                        <h3>SOCIAL MEDIA</h3>
                        <nav>
                            <Link to="#"><img src="./icons/twitter.svg" className="icon" /></Link>
                            <Link to="#"><img src="./icons/twitter.svg" className="icon" /></Link>
                            <Link to="#"><img src="./icons/twitter.svg" className="icon" /></Link>
                            <Link to="#"><img src="./icons/twitter.svg" className="icon" /></Link>
                            <Link to="#"><img src="./icons/twitter.svg" className="icon" /></Link>
                        </nav>
                    </div>
                    <div>
                        <div className="logo"></div>
                    </div>
                    <div>
                        <h3 style={{fontWeight: 'bold'}}>Simple Recipes That<br />Make You Feel Good</h3>
                    </div>
                </div>
                <div className="bottom">
                    <nav className="main">
                        <Link to="#">RECIPES</Link>
                        <Link to="#">COOKBOOK</Link>
                        <Link to="#">SHOP</Link>
                        <Link to="#">JOBS</Link>
                        <Link to="#">ABOUT</Link>
                    </nav>
                    <nav className="sub">
                        <Link to="#">©MINIMALISTBAKER.COM</Link>
                        <Link to="#">PRIVACY POLICY</Link>
                        <Link to="#">TERMS</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Footer;