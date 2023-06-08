import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the server using an API endpoint
    axios.get("http://localhost:5000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}><Link to={"./profile/"+user.username}>{user.firstName} {user.lastName}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
