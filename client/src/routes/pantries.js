import React, { Component } from 'react';

class Pantries extends Component {

	componentDidMount() {
		document.title = 'Pantries - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Your Pantries</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Pantries;
