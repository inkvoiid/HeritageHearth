import { Component, h } from 'preact';

class Profile extends Component {

	componentDidMount() {
		document.title = 'Profile - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style="text-align:center;">
			<h1 class="brown">Your Profile</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Profile;
