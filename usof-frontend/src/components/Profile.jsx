import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './slices/usersSlice.js';
import { fetchPosts, selectors } from './slices/postsSlice.js';
import { useParams } from 'react-router-dom';
import Post from './Post.jsx';
import { isNull } from 'lodash';
import routes from '../routes.js';

export default function Profile() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector((state) => state.users.entities);
	const posts = useSelector(selectors.selectAll);
	const postsUser = posts.filter((post) => post.author_id === id);
	const heightPage = document.documentElement.scrollHeight;
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
	useEffect(() => {
		dispatch(fetchUserInfo({id, token}));
		dispatch(fetchPosts(token));
	}, []);
	return (
		user[id] && (
			<div className="divProfileBlock">
				<div className="ProfileForm">
					<div className="w-full md:w-3/12 md:mx-2">
						<div className="p-3 border-t-4 border-orange-400 sticky top-20">
							<div className="top-block">
								<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
									{user[id].login}
								</h1>
								<img
									className="profimg"
									src={'/avatars/default.png'
									// !isNull(user[id].profile_pic)
									// 	? routes.getPhoto(user[id].profile_pic)
									// 	: 
									}
									alt="" 
								/>
							</div>
							<ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
								<li className="flex items-center py-3">
									<span>Rating</span>
									<span className="ml-auto">
										<span
											className={`${
											user[id].rating < 0
												? 'bg-orange-800'
												: 'bg-orange-500'
											}  py-1 px-2 rounded text-white text-sm`}
										>
											{user[id].rating}
										</span>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full md:w-9/12 mx-2 h-64">
						<div className="p-3 shadow-sm rounded-sm">
							<span className="tracking-wide">About</span>
							<div className="text-gray-700">
								<div className="flex flex-col md:grid-cols-2 text-sm">
									<div className="flex">
										<div className="px-4 py-2 font-semibold">
											Full name: <span className="pl-7 py-2">{user[id].full_name || 'not added'}</span>
										</div> 
									</div>
									<div className="flex">
										<div className="px-4 py-2 font-semibold">
											Login: <span className="pl-7 py-2">{user[id].login}</span>
											</div>
									</div>
									<div className="flex">
										<div className="px-4 py-2 font-semibold">
											Email: <span className="pl-7 py-2"><a className="text-blue-800" href={`mailto:${user[id].email}`}>{user[id].email}</a></span>
										</div>
									</div>
								</div>
							</div>
							<button className="Edit_btn">
								Profile editing
							</button>
						</div>

						<div className="my-4"></div>

						{/* <div className="bg-white p-3 shadow-sm rounded-sm">
							<ul className="list-group">
							{postsUser.map((post) => (
								<li key={post.id}>
								<Post post={post} users={user} isProfile={true} />
								</li>
							))}
							</ul>
						</div> */}
					</div>
				</div>
			</div>
		)
	);
};

