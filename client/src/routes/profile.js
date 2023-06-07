import React, { useEffect, useState } from 'react';
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
		axios.get(`http://localhost:5000/api/users/${profileId}`)
		  .then(response => {
			setProfile(response.data);
			setLoading(false);
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
		const profileFriendsString = profile.friends.toString().replaceAll(',', ', ');
        const profileSavedRecipesString = profile.savedRecipes.toString().replaceAll(',', ', ');
        const profileRecipesString = profile.recipes.toString().replaceAll(',', ', ');
        const profilePantriesString = profile.pantries.toString().replaceAll(',', ', ');
        const profileListsString = profile.lists.toString().replaceAll(',', ', ');
		pageContent = (<div>
		  <h3>{profile.firstName} {profile.lastName}</h3>
            <p>Friends: {profileFriendsString}</p>
            <p>Saved Recipes: {profileSavedRecipesString}</p>
            <p>Recipes: {profileRecipesString}</p>
            <p>Pantries: {profilePantriesString}</p>
            <p>Lists: {profileListsString}</p>
		</div>);
	  }
	
	  
	
	  return (
		<>
			<article style={{ textAlign: 'center' }}>
				{pageContent}
			</article>
		</>
	  );
	};

export default Profile;
