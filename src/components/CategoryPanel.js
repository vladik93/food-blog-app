import './CategoryPanel.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryPanel = () => {
    const [ categories, setCategories ] = useState([]);

    const getAllCategories = async() => {
        await axios({
            url: 'http://localhost:4000/api/categories',
            method: 'GET',
        }).then((response) => {
            setCategories(response.data);
            console.log(response);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="categoryPanel">
            <div className="categories">
                {categories && categories.map((category) => (
                    <Link to={`/category/${category._id}`} className="category">
                        <img src={`./icons/categories/${category.image}`} className="icon" />
                        <p>{category.title.toUpperCase()}</p>
                    </Link>
                ))}
                <Link to={`/category/0`} className="category">
                    <img src="./icons/categories/arrow_right.svg" className="icon" />
                    <p>MORE RECIPES</p>
                </Link>
            </div>
        </div>
    )
}

export default CategoryPanel;