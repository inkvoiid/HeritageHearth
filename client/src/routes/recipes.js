import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import RecipePreview from "../components/recipePreview";

const Recipes = () => {

	useEffect(() => {
		document.title = 'Browse Recipes - Our Kitchen';
	  }, []);

	  const [recipePreviews, setRecipePreviews] = useState([]);

	  useEffect(() => {
		// Fetch users from the server using an API endpoint
		axios.get("http://localhost:5000/api/recipes")
		  .then(response => {
			setRecipePreviews(response.data);
		  })
		  .catch(error => {
			console.error(error);
		  });
	  }, []);

	return(
		<>
		<div style={{ textAlign:'center' }}>
			<h1 className="brown">Browse Recipes</h1>
			<section className='grid squares'>
				<article>
					<Link to={"/recipes/new"}><b>+ Create a new recipe</b></Link>
				</article>

				{recipePreviews.map(recipePreview => (
				<RecipePreview key={recipePreview.recipeId} recipe={recipePreview} />
			))}
			</section>
			
		</div>
		</>
		);
	};

export default Recipes;
