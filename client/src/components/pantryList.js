import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PantryList = () => {
  const [pantries, setPantries] = useState([]);

  useEffect(() => {
    // Fetch users from the server using an API endpoint
    axios.get("http://localhost:5000/api/pantries")
      .then(response => {
        setPantries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>List of Pantries</h1>
      <ul>
        {pantries.map(pantry => (
          <li key={pantry._id}><Link to={"./pantry/"+pantry._id}>{pantry.name} - {pantry.userAccess.join(', ')}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default PantryList;
