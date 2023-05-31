import { h } from 'preact';
import { Router } from 'preact-router';
import '../css/main.css';

import Navbar from './navbar';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';

const App = () => (
	<div id="app">
		<Navbar />
		<main>
			<Router>
				<Home path="/" />
			</Router>
		</main>
	</div>
);

export default App;
