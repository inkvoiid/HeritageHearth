import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserList from '../components/userList';
import PantryList from '../components/pantryList';
import ListList from '../components/listList';

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
					<Link to="/login" >Login</Link> <Link to="/register" >Register</Link>
					<UserList />
					<PantryList />
					<ListList />
				</article>
			</>
		);
	}
}

export default Home;
