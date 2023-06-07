import React, { Component } from 'react';

class Recipe extends Component {

	componentDidMount() {
		document.title = 'Recipe - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Kia Ora!</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Recipe;
