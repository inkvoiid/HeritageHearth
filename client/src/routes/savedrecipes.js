import { Component, h } from 'preact';

class SavedRecipes extends Component {

	componentDidMount() {
		document.title = 'Saved Recipes - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style="text-align:center;">
			<h1 class="brown">Your Saved Recipes</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default SavedRecipes;
