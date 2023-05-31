import { h } from 'preact';
import { Router } from 'preact-router';
import '../css/main.css';

import Navbar from './navbar';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Feed from '../routes/feed';
import SavedRecipes from '../routes/savedrecipes';
import Recipes from '../routes/recipes';
import Lists from '../routes/lists';
import Pantries from '../routes/pantries';
import Profile from '../routes/profile';
import Settings from '../routes/settings';

const App = () => (
	<div id="app">
		<Navbar />
		<main>
			<Router>
				<Home path="/" />
				<Feed path="/feed" />
				<SavedRecipes path="/savedrecipes" />
				<Recipes path="/recipes" />
				<Lists path="/lists" />
				<Pantries path="/pantries" />
				<Profile path="/profile" />
				<Settings path="/settings" />
			</Router>
		</main>
	</div>
);

export default App;
