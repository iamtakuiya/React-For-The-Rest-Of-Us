import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import LoadingDotsIcon from './LoadingDotsIcon';
import Post from './Post';

function ProfilePosts() {
	const ourRequest = Axios.CancelToken.source();

	const { username } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await Axios.get(`/profile/${username}/posts`, {
					cancelToken: ourRequest.token
				});
				console.log(response.data);
				setPosts(response.data);
				setIsLoading(false);
			} catch (e) {
				console.log('There was a problem or the request was cancelled.');
			}
		}
		fetchPosts();
		return () => {
			ourRequest.cancel();
		};
	}, [username]);

	if (isLoading)
		return (
			<div>
				<LoadingDotsIcon />
			</div>
		);

	return (
		<div className="list-group">
			{posts.map((post) => {
				return <Post noAuthor={true} post={post} key={post._id} />;
			})}
		</div>
	);
}

export default ProfilePosts;
