import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { useParams } from 'react-router-dom';

const Profile = () => {
	let {profileId} = useParams();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	let pageContent;

	useEffect(() => {
		document.title = 'Profile - Our Kitchen';
	  }, []);

	  useEffect(() => {
		// Fetch profile data based on the profileId
		axios
		  .get(`http://localhost:5000/api/users/${profileId}`)
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
				  const friendPromises = fetchedProfile.friends.map(friendId =>
					axios.get(`http://localhost:5000/api/users/${friendId}`)
				  );
				  const friendResponses = await Promise.all(friendPromises);
				  const friendsData = friendResponses.map(response => response.data);
				  setProfile(prevProfile => ({
					...prevProfile,
					friends: friendsData
				  }));
				}
				fetchFriends();
			  };
	  
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
	  }, [profileId]);

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
						<li key={savedRecipe._id}><Link to={"../recipe/"+savedRecipe._id}>{savedRecipe.name}</Link></li>
					))}
				</ul>
			</article>

			<article>
				<p>Recipes:</p>
				<ul>
					{profile.recipes.map(recipe => (
						<li key={recipe._id}><Link to={"../recipe/"+recipe._id}>{recipe.name}</Link></li>
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
