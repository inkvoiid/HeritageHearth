import { Component, h } from 'preact';

class Home extends Component {

	componentDidMount() {
		document.title = 'Home - Our Kitchen';
	  }

	render() {
		return(
		<>
		<article style="text-align:center;">
			<h1 class="brown">Kia Ora!</h1>
			<h3>Nau mai, Haere mai ki Our Kitchen</h3>
			<p>This is the Home component.</p>
		</article>
		</>
		);
	};
};

export default Home;
