import React, { useEffect } from 'react';
import { fetchPosts, selectors, getFetchStatus } from './slices/postsSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post.jsx';
import { fetchUsers, userSelectors } from './slices/usersSlice.js';

export default function Home() {
	const posts = useSelector(selectors.selectAll);
	const users = useSelector((state) => state.users.entities);
	const isLoading = useSelector(getFetchStatus);
	const dispatch = useDispatch();
	const { currentUser, token } = JSON.parse(
			localStorage.getItem('currentUser')
		);
	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUsers(token));
	}, []);
	console.log(posts);
	return (
		posts && (
			<>
				<div className="All_Posts">
					{posts.map((post) => (
							<Post post={post} users={users} />
					))}
				</div>
			</>
		) 
	);
};
