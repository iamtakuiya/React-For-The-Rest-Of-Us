import React, { useContext, useEffect } from 'react';
import Page from './Page';
import StateContext from '../StateContext';
import { useImmer } from 'use-immer';
import LoadingDotsIcon from './LoadingDotsIcon';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
	const appState = useContext(StateContext);
	const [state, setState] = useImmer({
		isLoading: true,
		feed: []
	});

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source();

		async function fetchData() {
			try {
				const response = await Axios.post(
					'/getHomeFeed',
					{
						token: appState.user.token
					},
					{ cancelToken: ourRequest.token }
				);
				// console.log(response.data);

				setState((draft) => {
					draft.isLoading = false;
					draft.feed = response.data;
				});
			} catch (e) {
				console.log('There was a problem.');
			}
		}
		fetchData();
		return () => {
			ourRequest.cancel();
		};
	}, []);

	if (state.isLoading) {
		return <LoadingDotsIcon />;
	}

	return (
		<Page title="Your Feed">
			{/* If we have content display feed */}
			{state.feed.length > 0 && (
				<>
					<h2 className="text-center mb-4">The Latest From Those You Follow</h2>
					<div className="list-group">
						{state.feed.map((post) => {
							const date = new Date(post.createdDate);
							const dateFormatted = `${
								date.getMonth() + 1
							}/${date.getDate()}/${date.getFullYear()}`;

							return (
								<Link
									onClick={() => appDispatch({ type: 'closeSearch' })}
									key={post._id}
									to={`/post/${post._id}`}
									className="list-group-item list-group-item-action"
								>
									<img className="avatar-tiny" src={post.author.avatar} />{' '}
									<strong>{post.title}</strong>{' '}
									<span className="text-muted small">
										by {post.author.username} on {dateFormatted}
									</span>
								</Link>
							);
						})}
					</div>
				</>
			)}
			{/* If the content is empty display this */}
			{state.feed.length == 0 && (
				<>
					<h2 className="text-center">
						Hello <strong>{appState.user.username}</strong>, your feed is empty.
					</h2>
					<p className="lead text-muted text-center">
						Your feed displays the latest posts from the people you follow. If
						you don&rsquo;t have any friends to follow that&rsquo;s okay; you
						can use the &ldquo;Search&rdquo; feature in the top menu bar to find
						content written by people with similar interests and then follow
						them.
					</p>
				</>
			)}
		</Page>
	);
}

export default Home;
