import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch users from the server using an API endpoint
    axios.get("http://localhost:5000/api/lists")
      .then(response => {
        setLists(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>List of Lists</h1>
      <ul>
        {lists.map(list => (
          <li key={list._id}><Link to={"./lists/"+list._id}>{list.name} - {list.userAccess.join(', ')}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default ListList;
