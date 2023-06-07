import React, { Component } from 'react';

class Settings extends Component {

	componentDidMount() {
		document.title = 'Settings - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Your Settings</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Settings;
