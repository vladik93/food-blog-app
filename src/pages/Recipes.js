import './Recipes.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FiltersPanel from '../components/FiltersPanel';

const Recipes = ({ recipes, categories, getProductsBySearch }) => {
    return (
        <div className="recipes">
            <section className="section" id="main">
                <div className="titleWrapper">
                    <h2 style={{textAlign: 'center'}}>ALL RECIPES</h2>
                </div>
                <div className="dishes">
                    {recipes && recipes.map((recipe) => (
                        <Link to={`./${recipe._id}`}>
                            <div className="dish">
                                <div className="imgWrapper">
                                    <img src={`./images/dishes/${recipe.image}`} />
                                </div>
                                <div className="txtWrapper">
                                    <h1 className="title">{recipe.title}</h1>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <FiltersPanel categories={categories} getProductsBySearch={getProductsBySearch} />
        </div>
    )
}

export default Recipes;


