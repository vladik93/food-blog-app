import './FiltersPanel.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FiltersPanel = ({ getProductsBySearch, categories }) => {
    const [ recipeSearch, setRecipeSearch ] = useState("");
    const [ checked, setChecked ] = useState([]);
    const [ categoriesWithCount, setCategoriesWithCount ] = useState([]);

    const URI = 'http://localhost:4000/api';

    const onCheckboxChange = (_id) => {
        let selected = checked;
        let find = selected.indexOf(_id);

        if(find > -1) {
            selected.splice(find, 1);
        } else {
            selected.push(_id);
        }
        setChecked([...selected]);
    }

    const retrieveProducts = () => {
        axios({
            url: URI + '/search/products',
            method: 'GET',
            params: {
                searchParam: recipeSearch
            },
            data: {
                categories: checked
            }
        }).then((response) => {
            getProductsBySearch(response.data);
        })
        .catch((error) => console.log(error));
    }

    const getCategoriesWithParam = () => {
        axios({
            url: URI + '/products/categories',
            method: 'GET',
            params: {
                searchParam: recipeSearch
            }
        }).then((response) => {
            setCategoriesWithCount(response.data);
        })
        .catch((error) => console.log(error));

    }

    useEffect(() => {
        getCategoriesWithParam();
    }, []);

    return (
        <section className="section" id="filtersPanel">
            <form onKeyUp={retrieveProducts}>
                <div className="inputWrapper">
                    <h3>SEARCH RECIPE</h3>
                    <input type="text" value={recipeSearch} onChange={(e) => setRecipeSearch(e.target.value)} />
                </div>
                <div className="txtWrapper">
                    <h3>FILTER RECIPES:</h3>
                    <p>CHECK THE BOXES TO NARROW DOWN THE SEARCH RESULTS:</p>
                </div>
                <div className="categoryWrapper">
                    <h3 className="title">CATEGORIES:</h3>
                    <div className="categories">
                        {/* {categories.map((category) => )} */}
                        {/* {ctCount && ctCount.map((count) => {
                            categories && categories.map(({_id, title}) => {
                                count.count > 0 ? (
                                    <div className="category" key={_id}>
                                        <label for={title}>{title} <span style={{color: 'gray', fontSize: '0.8rem'}}>{`${count.count}`}</span></label>
                                        <input type="checkbox" id={title} name={title} value={_id} className="checkbox" 
                                        onChange={() => onCheckboxChange(_id)}
                                        checked={checked.includes(_id)}    />
                                    </div>
                                )  
                            })
                        
                        })} */}
                    </div>
                </div>
            </form>
        </section>
    )
}

export default FiltersPanel;