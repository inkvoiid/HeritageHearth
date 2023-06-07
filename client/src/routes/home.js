import React, { Component } from 'react';

class Home extends Component {
	componentDidMount() {
		document.title = 'Home - Our Kitchen';
	}

	render() {
		return (
			<>
				<article style={{ textAlign: 'center' }}>
					<h1 className="brown">Kia Ora!</h1>
					<h3>Nau mai, Haere mai ki Our Kitchen</h3>
					<p>This is the Home component.</p>
				</article>
			</>
		);
	}
}

export default Home;
