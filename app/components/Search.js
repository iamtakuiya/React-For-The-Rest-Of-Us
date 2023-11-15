import React, { useContext, useEffect } from 'react';
import DispatchContext from '../DispatchContext';
import { useImmer } from 'use-immer';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Post from './Post';

function Search() {
	const appDispatch = useContext(DispatchContext);

	const [state, setState] = useImmer({
		searchTerm: '',
		results: [],
		show: 'neither',
		requestCount: 0
	});

	useEffect(() => {
		document.addEventListener('keyup', searchKeyPressHandler);
		return () => document.removeEventListener('keyup', searchKeyPressHandler);
	}, []);

	useEffect(() => {
		if (state.searchTerm.trim()) {
			const delay = setTimeout(() => {
				setState((draft) => {
					draft.show = 'loading';
				});
				console.log(state.searchTerm);
				setState((draft) => {
					draft.requestCount++;
				});
			}, 750);

			return () => clearTimeout(delay);
		} else {
			setState((draft) => {
				draft.show = 'neither';
			});
		}
	}, [state.searchTerm]);

	useEffect(() => {
		if (state.requestCount) {
			// Send axios request here
			const ourRequest = Axios.CancelToken.source();
			async function fetchResults() {
				try {
					const response = await Axios.post(
						'/search',
						{ searchTerm: state.searchTerm },
						{ cancelToken: ourRequest.token }
					);
					console.log(response.data);
					setState((draft) => {
						draft.results = response.data;
						draft.show = 'results';
					});
				} catch (error) {
					console.log(
						`There was a problem or the request was cancelled: ${error}`
					);
				}
			}
			fetchResults();
			return () => ourRequest.cancel();
		}
	}, [state.requestCount]);

	function searchKeyPressHandler(e) {
		if (e.keyCode == 27) {
			appDispatch({ type: 'closeSearch' });
		}
	}

	function handleInput(e) {
		const value = e.target.value;
		setState((draft) => {
			draft.searchTerm = value;
		});
	}

	return (
		<div className="search-overlay">
			<div className="container container--narrow py-md-5">
				<h2>
					<img
						className="avatar-small"
						src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
					/>{' '}
					brad
					<button className="btn btn-primary btn-sm ml-2">
						Follow <i className="fas fa-user-plus"></i>
					</button>
				</h2>

				<div className="profile-nav nav nav-tabs pt-2 mb-4">
					<a href="#" className="nav-item nav-link">
						Posts: 3
					</a>
					<a href="#" className="active nav-item nav-link">
						Followers: 101
					</a>
					<a href="#" className="nav-item nav-link">
						Following: 40
					</a>
				</div>

				<div className="list-group">
					<a href="#" className="list-group-item list-group-item-action">
						{' '}
						<img
							className="avatar-tiny"
							src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
						/>{' '}
						barksalot{' '}
					</a>
					<a href="#" className="list-group-item list-group-item-action">
						{' '}
						<img
							className="avatar-tiny"
							src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
						/>{' '}
						barksalot{' '}
					</a>
					<a href="#" className="list-group-item list-group-item-action">
						{' '}
						<img
							className="avatar-tiny"
							src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
						/>{' '}
						barksalot{' '}
					</a>
					<a href="#" className="list-group-item list-group-item-action">
						{' '}
						<img
							className="avatar-tiny"
							src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
						/>{' '}
						barksalot{' '}
					</a>
					<a href="#" className="list-group-item list-group-item-action">
						{' '}
						<img
							className="avatar-tiny"
							src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"
						/>{' '}
						barksalot{' '}
					</a>
				</div>
			</div>

			<div className="search-overlay">
				<div className="search-overlay-top shadow-sm">
					<div className="container container--narrow">
						<label htmlFor="live-search-field" className="search-overlay-icon">
							<i className="fas fa-search"></i>
						</label>
						<input
							onChange={handleInput}
							autoFocus
							type="text"
							autoComplete="off"
							id="live-search-field"
							className="live-search-field"
							placeholder="What are you interested in?"
						/>
						<span
							onClick={() => appDispatch({ type: 'closeSearch' })}
							className="close-live-search"
						>
							<i className="fas fa-times-circle"></i>
						</span>
					</div>
				</div>

				<div className="search-overlay-bottom">
					<div className="container container--narrow py-3">
						<div
							className={
								'circle-loader ' +
								(state.show == 'loading' ? 'circle-loader--visible' : '')
							}
						></div>
						<div
							className={
								'live-search-results ' +
								(state.show == 'results' ? 'live-search-results--visible' : '')
							}
						>
							{Boolean(state.results.length) && (
								<div className="list-group shadow-sm">
									<div className="list-group-item active">
										<strong>Search Results</strong> ({state.results.length}
										{state.results.length > 1 ? 'items' : 'item'} items found)
									</div>

									{state.results.map((post) => {
										return (
											<Post
												post={post}
												key={post._id}
												onClick={() => appDispatch({ type: 'closeSearch' })}
											/>
										);
									})}
								</div>
							)}
							{!Boolean(state.results.length) && (
								<p className="alert alert-danger text-center shadow-sm">
									Sorry, we could not find any results.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Search;
