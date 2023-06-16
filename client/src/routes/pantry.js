import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Pantry = () => {
  const { pantryId } = useParams();
  const [pantry, setPantry] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Pantry - Our Kitchen';
  }, []);

  useEffect(() => {
    // Fetch pantry data based on the pantryId
    axios
      .get(`http://localhost:5000/api/pantries/${pantryId}`)
      .then(response => {
        const fetchedPantry = response.data;
        setPantry(fetchedPantry);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [pantryId]);

  const handleDeletePantry = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pantries/${pantryId}`);
      toast.success('Pantry successfully deleted!');
      navigate('/pantries');
      // Redirect to the home page or any other desired page after successful deletion
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        console.error(error);
      }
    }
  };

  let pageContent;

  if (!pantry || pantry === {} || pantryId === 'undefined') {
    pageContent = <div>Pantry not found</div>;
  } else if (loading) {
    pageContent = <div>Loading...</div>;
  } else {
    pageContent = (
      <>
        <article>
          <h1>{pantry.name}</h1>

          <Link to={`/pantry/${pantryId}/edit`}>
            <b>Edit Pantry</b>
          </Link>
          <button onClick={handleDeletePantry}>Delete Pantry</button>

          <h3>User Access:</h3>
          <ul>
            {pantry.userAccess.map(userId => (
              <li key={userId}>{userId}</li>
            ))}
          </ul>

          <h3>Items:</h3>
          <ul>
            {pantry.items.map(item => (
              <li key={item._id}>
                {item.name}
                {item.category && (
                  <span>
                    {' '}
                    - Category: {item.category}
                  </span>
                )}
                {item.state && (
                  <span>
                    {' '}
                    - State: {item.state}
                  </span>
                )}
                {item.quantity && item.unit && (
                  <span>
                    {' '}
                    - Quantity: {item.quantity} {item.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </article>
      </>
    );
  }

  return <>{pageContent}</>;
};

export default Pantry;
