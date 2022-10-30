import './Home.css';
import CategoryPanel from '../components/CategoryPanel';
import PromoCarousel, { CarouselItem } from '../components/PromoCarousel';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AnimateHeight from 'react-animate-height';

const Home = () => {
    const [ elementIsVisible, setElementIsVisible ] = useState(); 
    const [ sectionIsVisible, setSectionIsVisible ] = useState();
    const [ recipes, setRecipes ] = useState([]);
    const [ recentRecipesExpanded, setRecentRecipesExpanded ] = useState(false);
    const [ recipesHeight, setRecipesHeight ] = useState(450);
    
    const myRef = useRef();
    const mySecondRef = useRef();
    const dishesRef = useRef();
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setElementIsVisible(entry.isIntersecting);
            
        }, observerOptions);

        observer.observe(myRef.current);

    }, []);

    const getAllRecipes = async() => {
        await axios({
            url: 'http://localhost:4000/api/recipes',
            method: 'GET',
        }).then((response) => {
            setRecipes(response.data);
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllRecipes();
    }, []);
    
    return (
        <div className="home">
            <section className="section" id="currentDish">
                <h2 className="title">Today's Dish</h2>
                <div className="panel">
                    <div className="imgWrapper">
                        <img src="./images/dishes/latest_dish.jpg" alt='' />
                    </div>
                    <div className="txtWrapper">
                        <h1>RIBS DINNER</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lorem eu felis gravida tincidunt sit amet eu nulla. Nulla posuere eget nibh vitae blandit. Vestibulum vel maximus orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut quis arcu id nisi facilisis congue. Etiam sit amet risus augue.</p>
                        <div className="btnWrapper">
                            <button className="more-bg">Read More</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <CategoryPanel />
            </section>
            {/* <section className="section" id="promo"> */}
            <PromoCarousel>
                <CarouselItem>
                    <img src="./images/promos/promo_1.jfif" alt='' />
                    <div className="txtWrapper">
                        <h3>GET IT NOW!</h3>
                        <h1>OUR NEW BOOK</h1>
                        <ul>
                            <li>Donec ut lectus ut sapien tristique elementum.</li>
                            <li>Aenean sed odio non nunc viverra faucibus.</li>
                            <li>In fringilla lectus eu ante porttitor, pellentesque volutpat massa tempus.</li>
                            <li>Praesent bibendum nibh ut erat auctor, quis ultrices purus viverra.</li>
                        </ul>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <img src="./images/items/kitchen_knife.png" alt='' />
                    <div className="txtWrapper">
                        <h3>GET IT NOW!</h3>
                        <h1>JAPANESE KITCHEN KNIFE</h1>
                        <ul>
                            <li>Praesent bibendum nibh ut erat auctor, quis ultrices purus viverra.</li>
                            <li>In fringilla lectus eu ante porttitor, pellentesque volutpat massa tempus.</li>
                        </ul>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <img src="./images/items/mug.jpg" alt='' />
                    <div className="txtWrapper">
                        <h3>GET IT NOW!</h3>
                        <h1>OUR COMPANY MUG</h1>
                        <ul>
                            <li>Sed sit amet risus nec quam pulvinar posuere.</li>
                            <li>Curabitur in lacus non felis hendrerit mollis ac sit amet magna.</li>
                        </ul>
                    </div>
                </CarouselItem>
            </PromoCarousel>
            {/* </section> */}
            <section className="section" id="recentDishes">
                <h2 className="title">Latest Recipes</h2>
                <AnimateHeight height={recipesHeight}>
                    <div className="dishes" ref={dishesRef}>
                        {recipes && recipes.filter((val, i) => i < 6)
                        .map((recipe) => (
                            <div className="dish" key={recipe._id}>
                                <div className="imgWrapper">
                                    <img src={`./images/dishes/${recipe.image}`} />
                                </div>
                                <div className="txtWrapper">
                                    <h1>{recipe.title}</h1>
                                    <p>{recipe.text}</p>
                                    <Link to={`recipes/${recipe._id}`}>
                                        <button className="more-bg">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimateHeight>
                <div className="btnWrapper">
                    {recentRecipesExpanded ? 
                        <button className="lessBtn" onClick={() => {
                            setRecipesHeight(450);
                            setRecentRecipesExpanded(false);
                    }}>Less Recipes</button>
                    : 
                    <button className="moreBtn" onClick={() => {
                        setRecipesHeight('auto');
                        setRecentRecipesExpanded(true);
                    }}>More Recipes
                    </button> 
                    }
                    {recentRecipesExpanded && 
                        <Link to="/recipes">
                            <button className="showAllBtn">Show All Recipes</button>
                        </Link>
                    }
                </div>
            </section>
            <section className={`section ${elementIsVisible ? 'isVisible' : 'isHidden'}`} id="shop" ref={myRef}>
                <div className="content">
                    <div className="txtWrapper">
                        <h1>SHOP</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a velit sapien. Ut nulla orci, ultricies id odio dictum, sagittis aliquet risus. Praesent dignissim aliquam luctus. Sed vel odio sit amet metus tincidunt mollis.</p>
                    </div>
                    <div className="btnWrapper">
                        <button>SHOP OUR RECOMMENDATION</button>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Home;