import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Recipe = () => {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [creatorId, setCreatorId] = useState(null);
	const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

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

  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`);
      toast.success(`Recipe successfully deleted!`);
      navigate("/recipes");
      // Redirect to the home page or any other desired page after successful deletion
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          console.error(error);
        }
  }
  };

  let pageContent;

  if (!recipe || recipe === {} || recipeId === "undefined") {
    pageContent = <div>Recipe not found</div>;
  } else if (loading) {
    pageContent = <div>Loading...</div>;
  } else {
    pageContent = (
      <>
      <article>
			<p><b>{recipe.name}</b> by <Link to={"../profile/"+creatorId}>{recipe.creator}</Link></p>

      <Link to={"/recipe/"+recipeId+"/edit"}><b>Edit Recipe</b></Link>
      <button onClick={handleDeleteRecipe}>Delete Recipe</button>
			<p>Serving Size: {recipe.servingSize}</p>
			<p>Cooking Time: {recipe.cookingTime.length} {recipe.cookingTime.unit}</p>
		</article>

		<article>
			<p>Description: {recipe.description}</p>
		</article>

		<article>
			<p>Ingredients</p>
			<ul>
				{recipe.ingredients.map((ingredient) => (
					<li>{ingredient.name}</li>
				))}
			</ul>
		</article>

		<article>
			<p>Directions</p>
			<ol>
				{recipe.instructions.map((instruction) => (
					<li>{instruction}</li>
				))}
			</ol>
		</article>

		<article>
			<p>Comments</p>
			<ul>
				{recipe.comments.map((comment) => (
					<li>{comment}</li>
				))}
			</ul>
		</article>
      </>
    );
  }

  return <>{pageContent}</>;
};

export default Recipe;
