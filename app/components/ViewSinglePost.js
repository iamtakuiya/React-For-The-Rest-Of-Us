import React, { useEffect, useState } from 'react';
import Page from './Page';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

function ViewSinglePost() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState();
	console.log(post, 'this is post');

	useEffect(() => {
		async function fetchPost() {
			try {
				const response = await Axios.get(`/post/${id}`);
				setPost(response.data);
				console.table(response.data);
				setIsLoading(false);
			} catch (e) {
				console.log('There was a problem.');
			}
		}

		fetchPost();
	}, []);

	if (isLoading) return <Page title="...">Loading...</Page>;

	const date = new Date(post.createdDate);
	const dateFormatted = `${
		date.getMonth() + 1
	}/${date.getDate()}/${date.getFullYear()}`;

	return (
		<Page title={post.title}>
			<div className="container container--narrow py-md-5">
				<div className="d-flex justify-content-between">
					<h2>{post.title}</h2>
					<span className="pt-2">
						<a href="#" className="text-primary mr-2" title="Edit">
							<i className="fas fa-edit"></i>
						</a>
						<a className="delete-post-button text-danger" title="Delete">
							<i className="fas fa-trash"></i>
						</a>
					</span>
				</div>

				<p className="text-muted small mb-4">
					<Link to={`/profile/${post.author.username}`}>
						<img className="avatar-tiny" src={post.author.avatar} />
					</Link>
					Posted by{' '}
					<Link to={`/profile/${post.author.username}`}>
						${post.author.username}
					</Link>{' '}
					{dateFormatted}
				</p>

				<div className="body-content">{post.body}</div>
			</div>
		</Page>
	);
}

export default ViewSinglePost;
