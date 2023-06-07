import React, { Component } from 'react';

class Recipes extends Component {

	componentDidMount() {
		document.title = 'Recipes - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Your Recipes</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Recipes;
