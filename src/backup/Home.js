import './Home.css';
import CategoryPanel from '../components/CategoryPanel';
import PromoCarousel, { CarouselItem } from '../components/PromoCarousel';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [ elementIsVisible, setElementIsVisible ] = useState(); 
    const [ sectionIsVisible, setSectionIsVisible ] = useState();
    const [ recipes, setRecipes ] = useState([]);
    
    const myRef = useRef();
    const mySecondRef = useRef();
    
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
                        <h1>Ribs and Some Shit</h1>
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
                <div className="dishes" ref={myRef}>
                    <div className={`dish ${elementIsVisible ? 'visible' : 'hidden'}`}>
                        <div className="imgWrapper">
                            <img src="./images/dishes/dish_1.jpg" alt='' />
                        </div>
                        <div className="txtWrapper">
                            <h1>Recipe #1</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a posuere leo.</p>
                            <button className="more-bg">Read More</button>
                        </div>
                    </div>
                    <div className="dish">
                        <div className="imgWrapper">
                            <img src="./images/dishes/dish_2.jpg" alt='' />
                        </div>
                        <div className="txtWrapper">
                            <h1>Recipe #2</h1>
                            <p>Pellentesque nec turpis ultricies, lacinia quam vitae, aliquet augue. Pellentesque arcu massa, placerat vel volutpat ac, suscipit non lacus.</p>
                            <button className="more-bg">Read More</button>
                        </div>
                    </div>
                    <div className={`dish ${elementIsVisible ? 'visible' : 'hidden'}`}>
                        <div className="imgWrapper">
                            <img src="./images/dishes/dish_3.jpg" alt='' />
                        </div>
                        <div className="txtWrapper">
                            <h1>Recipe #3</h1>
                            <p>Nullam et mauris at neque volutpat varius eu id orci. Aenean tellus massa, imperdiet interdum egestas tristique, porttitor vitae ligula.</p>
                            <button className="more-bg">Read More</button>
                        </div>
                    </div>
                </div>
                <div className="btnWrapper">
                    <button className="moreBtn">More Recipes</button>
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