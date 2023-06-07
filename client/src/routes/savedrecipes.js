import React, { Component } from 'react';

class SavedRecipes extends Component {

	componentDidMount() {
		document.title = 'Saved Recipes - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Your Saved Recipes</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default SavedRecipes;
