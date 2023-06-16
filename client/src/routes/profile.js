import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
	let {profileUsername} = useParams();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	let pageContent;

	useEffect(() => {
		document.title = 'Profile - Our Kitchen';
	  }, []);

	  useEffect(() => {
		// Fetch profile data based on the profileId
		axios
		  .get(`http://localhost:5000/api/users/${profileUsername}`)
		  .then(response => {
			const fetchedProfile = response.data;
			setProfile(fetchedProfile);
			setLoading(false);
	
			if (fetchedProfile.recipes && fetchedProfile.recipes.length > 0) {
			  const fetchRecipes = async () => {
				const recipePromises = fetchedProfile.recipes.map(recipeId =>
				  axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
				);
				const recipeResponses = await Promise.all(recipePromises);
				const recipesData = recipeResponses.map(response => response.data);
				setProfile(prevProfile => ({
				  ...prevProfile,
				  recipes: recipesData
				}));
			  };
			  fetchRecipes();
			}

			const fetchFriends = async () => {
				if (fetchedProfile.friends && fetchedProfile.friends.length > 0) {
				  const friendPromises = fetchedProfile.friends.map(friendUsername =>
					axios.get(`http://localhost:5000/api/users/${friendUsername}`)
				  );
				  const friendResponses = await Promise.all(friendPromises);
				  const friendsData = friendResponses.map(response => response.data);
				  setProfile(prevProfile => ({
					...prevProfile,
					friends: friendsData
				  }));
				};
				fetchFriends();
			  }
	  
			  const fetchSavedRecipes = async () => {
				if (fetchedProfile.savedRecipes && fetchedProfile.savedRecipes.length > 0) {
				  const recipePromises = fetchedProfile.savedRecipes.map(recipeId =>
					axios.get(`http://localhost:5000/api/recipes/${recipeId}`)
				  );
				  const recipeResponses = await Promise.all(recipePromises);
				  const recipesData = recipeResponses.map(response => response.data);
				  setProfile(prevProfile => ({
					...prevProfile,
					savedRecipes: recipesData
				  }));
				}
				fetchSavedRecipes();
			  };
		  })
		  .catch(error => {
			console.error(error);
			setLoading(false);
		  });
	  }, [profileUsername]);

	  if (!profile) {
		pageContent = (<div>Profile not found</div>);
	  }
	  else if (loading) {
		pageContent = (<div>Loading...</div>);
	  }
	  else
	  {
		pageContent = (<div>
		  
			<article>
		  		<h3>{profile.firstName} {profile.lastName}</h3>
				<p>{profile.username}</p>

            	<p>Friends:</p>
				<ul>
					{profile.friends.map(friend => (
						<li key={friend._id}>{friend.firstName} {friend.lastName}</li>
					))}
				</ul>
			</article>

			<article>
				<p>Saved Recipes:</p>
				<ul>
					{profile.savedRecipes.map(savedRecipe => (
						<li key={savedRecipe.recipeId}><Link to={"../recipe/"+savedRecipe.recipeId}>{savedRecipe.name}</Link></li>
					))}
				</ul>
			</article>

			<article>
				<p>Recipes:</p>
				<ul>
					{profile.recipes.map(recipe => (
						<li key={recipe.recipeId}><Link to={"../recipe/"+recipe.recipeId}>{recipe.name}</Link></li>
					))}
				</ul>
			</article>

			<article>
				<p>Lists:</p>
				<ul>
					{profile.lists.map(list => (
						<li key={list._id}><Link to={"../list/"+list._id}>{list.name}</Link></li>
					))}
				</ul>
			</article>

			<article>
				<p>Pantries</p>
				<ul>
					{profile.pantries.map(pantry => (
						<li key={pantry._id}><Link to={"../pantry/"+pantry._id}>{pantry.name}</Link></li>
					))}
				</ul>
			</article>
		</div>);
	  }
	
	  
	
	  return (
		<>
		{pageContent}
		</>
	  );
	};

export default Profile;
