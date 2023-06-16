import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const Navbar = () => { 
  const [decodedUsername, setDecodedUsername] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
          const decodedToken = jwt_decode(jwtToken);
          const { UserInfo } = decodedToken;
          const { username } = UserInfo;
          setDecodedUsername(username);
        } else {
          setDecodedUsername('');
        }
      } catch (error) {
        console.error('Error decoding access token:', error);
        setDecodedUsername('');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return(
    <nav>
      <NavLink to="/">
        <h1 className="title"><span className="green">Our</span> <span className="pink">Kitchen</span></h1>
      </NavLink>
      <div className="nav-inner">
        <div className="nav-items">
          <NavLink activeClassName="active" to="/feed"><i className="bi bi-house"></i> Feed</NavLink>
          <NavLink activeClassName="active" to="/saved-recipes"><i className="bi bi-bookmark"></i> Saved Recipes</NavLink>
          <NavLink activeClassName="active" to="/recipes"><i className="bi bi-journals"></i> Recipes</NavLink>
          <NavLink activeClassName="active" to="/lists"><i className="bi bi-list-task"></i> Lists</NavLink>
          <NavLink activeClassName="active" to="/pantries"><i className="bi bi-bookshelf"></i> Pantries</NavLink>
        </div>

        <div className="user-info">
          {decodedUsername !== "" ? (
            <>
              <NavLink activeClassName="active" className="brown" to="/profile">
                <img src="https://i.ytimg.com/vi/US-rsVhRREA/maxresdefault.jpg" className="avatar" alt="Avatar" />
                <p className="avatar-text">{decodedUsername}</p>
              </NavLink>
              <NavLink activeClassName="active" className="green" to="/settings">
                <i className="bi bi-gear"></i> Settings
              </NavLink>
              <NavLink className="green" to="/logout">
                <i className="bi bi-door-open"></i> Logout
              </NavLink>
            </>
          ) : (
            <>
            <Link to={"/login"} className="green">Login</Link>
            <Link to={"/register"} className="green">Register</Link>
            </>
          )
          }
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
