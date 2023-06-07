import React, { useEffect } from 'react';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import User from '../features/users/User';

const Feed = () => {
	const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

	let content;

	if(isLoading) 
	{
		content = (
			<>
			<article style={{ textAlign: 'center' }}>
				<h1 className="brown">Your Feed</h1>
				<h3>Nau mai, Haere mai ki Our Kitchen</h3>
				<p>Loading...</p>
			</article>
			</>
		)
	}

	if(isError) 
	{
		console.log(error);
		content = (
			<>
			<article style={{ textAlign: 'center' }}>
				<h1 className="brown">Your Feed</h1>
				<h3>Nau mai, Haere mai ki Our Kitchen</h3>
				<p>Error: {error?.message}</p>
			</article>
			</>
		)
	}

	if(isSuccess)
	{
		const {ids} = users;

		const userContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : <p>No users</p>;
		content = (
			<>
			<article style={{ textAlign: 'center' }}>
				<h1 className="brown">Your Feed</h1>
				<h3>Nau mai, Haere mai ki Our Kitchen</h3>
				{userContent}
			</article>
			</>
		)
	}
			

  useEffect(() => {
    document.title = 'Feed - Our Kitchen';
  }, []);

  return content;
};

export default Feed;
