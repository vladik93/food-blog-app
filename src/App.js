import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import LatestNews from './components/LatestNews';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Footer from './components/Footer';

function App() {
  const [ recipes, setRecipes ] = useState([]);
  const [ categories, setCategories ] = useState([]);

  const URI = 'http://localhost:4000/api';

  const getAllRecipes = async() => {
    await axios({
      url: URI + '/recipes',
      method: 'GET',
    }).then((response) => {
        setRecipes(response.data);
    }).catch((error) => console.log(error));
  }

  const getAllCategories = async() => {
    await axios({
      url: URI + '/categories',
      method: 'GET',
    }).then((response) => {
        setCategories(response.data);
          console.log(response);
      })
      .catch((error) => console.log(error));
  }

  const getProductsBySearch = (results) => {
    setRecipes(results);
  } 

    useEffect(() => {
      getAllRecipes();
      getAllCategories();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <LatestNews />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" 
              element={<Recipes 
              recipes={recipes} 
              categories={categories}   
              getProductsBySearch={getProductsBySearch} /> } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
