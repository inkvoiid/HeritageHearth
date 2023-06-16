import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Shopping List - Our Kitchen';
  }, []);

  useEffect(() => {
    // Fetch list data based on the listId
    axios
      .get(`http://localhost:5000/api/lists/${listId}`)
      .then(response => {
        const fetchedList = response.data;
        setList(fetchedList);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [listId]);

  const handleDeleteList = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/lists/${listId}`);
      toast.success('List successfully deleted!');
      navigate('/lists');
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

  if (!list || list === {} || listId === 'undefined') {
    pageContent = <div>List not found</div>;
  } else if (loading) {
    pageContent = <div>Loading...</div>;
  } else {
    pageContent = (
      <>
        <article>
          <h1>{list.name}</h1>

          <Link to={`/list/${listId}/edit`}>
            <b>Edit List</b>
          </Link>
          <button onClick={handleDeleteList}>Delete List</button>

          <h3>User Access:</h3>
          <ul>
            {list.userAccess.map(userId => (
              <li key={userId}>{userId}</li>
            ))}
          </ul>

          <h3>Items:</h3>
          <ul>
            {list.items.map(item => (
              <li key={item._id}>
                {item.completed ? (
                  <del>{item.name}</del>
                ) : (
                  <span>{item.name}</span>
                )}
                {item.quantity && item.unit && (
                  <span>
                    {' '}
                    - {item.quantity} {item.unit}
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

export default List;
