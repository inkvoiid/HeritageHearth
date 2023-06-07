import React, { useEffect } from 'react';
import User from '../components/User';

const Feed = () => {

  useEffect(() => {
    document.title = 'Feed - Our Kitchen';
  }, []);

  return (
	<>
	<article style={{ textAlign: 'center' }}>
		<h1 className="brown">Your Feed</h1>
		<h3>Nau mai, Haere mai ki Our Kitchen</h3>
	</article>
	</>
  );
};

export default Feed;
