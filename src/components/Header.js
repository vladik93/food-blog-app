import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <ul className="col">
                <Link to="/recipes">
                    <li>All Recipes</li>
                </Link>
                <li>Vegan</li>
                <li>Gluten-Free</li>
            </ul>
            <div className="col logoWrapper">
                <img src="./images/main_logo.svg" className="logo" />
            </div>
            <ul className="col">
                <li>About</li>
                <li>Shop</li>
                <li>Cook Book</li>
            </ul>
        </div>
    )
}



export default Header;