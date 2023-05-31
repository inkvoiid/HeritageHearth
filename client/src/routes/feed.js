import { Component, h } from 'preact';

class Feed extends Component {

	componentDidMount() {
		document.title = 'Feed - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style="text-align:center;">
			<h1 class="brown">Your Feed</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Feed;
