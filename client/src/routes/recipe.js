import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Recipe = () => {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [creatorId, setCreatorId] = useState(null);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Recipe - Our Kitchen';
  }, []);

  useEffect(() => {
    // Fetch recipe data based on the recipeId
    axios
      .get(`http://localhost:5000/api/recipes/${recipeId}`)
      .then(response => {
        const fetchedRecipe = response.data;
        setRecipe(fetchedRecipe);
        setCreatorId(fetchedRecipe.creator);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [recipeId]);

  useEffect(() => {
    // Fetch creator data based on the creatorId
    const fetchCreator = async () => {
      try {
        if (creatorId) {
          const creatorResponse = await axios.get(
            `http://localhost:5000/api/users/${creatorId}`
          );
          const creatorData = creatorResponse.data;
          setRecipe(prevRecipe => ({
            ...prevRecipe,
            creator: creatorData.firstName + " " + creatorData.lastName
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCreator();
  }, [creatorId]);

  let pageContent;

  if (!recipe) {
    pageContent = <div>Recipe not found</div>;
  } else if (loading) {
    pageContent = <div>Loading...</div>;
  } else {
    pageContent = (
      <>
        <p>recipe.recipeImage</p>
        <article>
			<p><b>{recipe.name}</b> by <Link to={"../profile/"+creatorId}>{recipe.creator}</Link></p>
		</article>

		<article>
          <p>Ingredients:</p>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </article>
      </>
    );
  }

  return <>{pageContent}</>;
};

export default Recipe;
