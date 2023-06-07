import React, { Component } from 'react';

class Profile extends Component {

	componentDidMount() {
		document.title = 'Profile - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style={{ textAlign:'center' }}>
			<h1 className="brown">Your Profile</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Profile;
