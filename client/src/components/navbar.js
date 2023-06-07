import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
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
        <NavLink activeClassName="active" className="brown" to="/profile"><img src="https://i.ytimg.com/vi/US-rsVhRREA/maxresdefault.jpg" className="avatar" alt="Avatar" /><p className="avatar-text"> Buddy Holly</p></NavLink>
        <NavLink activeClassName="active" className="green" to="/settings"><i className="bi bi-gear"></i> Settings</NavLink>
        <NavLink className="green" to="/logout"><i className="bi bi-door-open"></i> Logout</NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
