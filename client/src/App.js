import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';

import Home from './routes/home';
import Feed from './routes/feed';
import Recipe from './routes/recipe';
import SavedRecipes from './routes/savedrecipes';
import Recipes from './routes/recipes';
import Lists from './routes/lists';
import Pantries from './routes/pantries';
import Profile from './routes/profile';
import Settings from './routes/settings';



function App() {
  return (
    <>
        <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/recipe/:recipeId" element={<Recipe />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/pantries" element={<Pantries />} />
            <Route path="/profile/:profileUsername" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        </BrowserRouter>
    </>
  );
}

export default App;
