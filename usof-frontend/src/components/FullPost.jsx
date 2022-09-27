import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
	fetchInfoPost,
	getFetchStatus,
	fetchPostLike,
} from './slices/postsSlice.js';

import { fetchUsers } from './slices/usersSlice.js';

import NotFound from './404';
import routes from '../routes.js';
import CategoryPost from './CategoryPost';
import CommentsPost from './CommentsPost.jsx';
import CreateCommentPost from './CreateCommentPost';
import {
	fetchAllCommentPost,
	selectorsComment,
} from './slices/commentSlice.js';

const createLikePost = async (id, token, setLike, like) => {
	await axios.post(routes.createPostLike(id, token));
	setLike(like + 1);
};

const deleteLikePost = async (id, token, setLike, like) => {
	await axios.delete(routes.deletePostLike(id, token));
	setLike(like - 1);
};

export default function FullPost () {
	const { currentUser, token } = JSON.parse(
		localStorage.getItem('currentUser')
	);
	const dispatch = useDispatch();
	const postId = useParams().id;
	const post = useSelector((state) => state.posts.entities[postId]);
	const users = useSelector((state) => state.users.entities);
	const comments = useSelector(selectorsComment.selectAll);
	const error = useSelector((state) => state.posts.error);
	const postLike = useSelector((state) => state.posts.postLikes);
	const [editData, setEditData] = useState('');
	const [isLike, setLike] = useState(false);
	const [likes, setCountLike] = useState(0);
	const [isEdite, setEdite] = useState(false);
	useEffect(() => {
		dispatch(fetchUsers(token));
		dispatch(fetchInfoPost({postId, token}));
		dispatch(fetchAllCommentPost(postId));
		// dispatch(fetchPostLike(postId));
	}, []);

	useEffect(() => {
		const isUserLike = postLike[postId];
		if (isUserLike && isUserLike.likeInfo !== 'Empty') {
			isUserLike.likeInfo.find((item) => item.author_id === currentUser);
			if (isUserLike.length !== 0) {
				setLike(true);
			}
		}
		setCountLike(postLike[postId]?.countLike);
	}, [postLike]);

	useEffect(() => {}, [comments]);
	const editePost = async (e) => {
		e.preventDefault();
		await axios.patch(routes.updateDataPost(postId, token));
	};

	return error ? (
		<NotFound />
	) : (
		<div className="mt-10 px-4 max-w-screen-xl mx-auto px-8 pt-6">
			<div className="items-center border drop-shadow-2xl px-4 lg:flex lg:px-8">
				<div className="w-full rounded-lg">
					<p className="text-2xl text-center font-bold uppercase mt-10">
						{post?.title}
					</p>
					{/* <CategoryPost id={post.id} /> */}
					<div className="my-10 text-justify">
						{!isEdite ? (
						<p style={{ whiteSpace: 'pre-wrap' }}>
							{post?.content}
						</p>
						) : (
						<>
							<form onChange={editePost}>
								<textarea
									id="content"
									style={{ height: '200px' }}
									className={`w-full text-sm border border-orange-200 formik.errors.content ? 'border-rose-500' : null h-60`}
									name="content"
									type="text"
									placeholder="Enter comment"
									onChange={(e) => setEditData(e.target.value)}
									value={editData}
								/>
								<div className="flex w-full justify-between mt-2">
									<button className="py-2 px-10 rounded bg-orange-400 border border-orange-400 text-white ease-in duration-300 hover:border-orange-600 hover:bg-white hover:text-orange-600">
										Save edit
									</button>
									<lable
									className="cursor-pointer py-2 px-10 rounded bg-orange-400 border border-orange-400 text-white ease-in duration-300 hover:border-orange-600 hover:bg-white hover:text-orange-600"
									onClick={() => setEdite(false)}
									>
										Cancel
									</lable>
								</div>
							</form>
						</>
						)}
						{!isEdite ? (
						<div className="w-full flex justify-end">
							<button
							className="py-2 px-10 rounded bg-orange-400 border border-orange-400 text-white ease-in duration-300 hover:border-orange-600 hover:bg-white hover:text-orange-600"
							onClick={() => setEdite(true)}
							>
								Edit
							</button>
						</div>
						) : null}
					</div>
					<div className="flex">
						{isLike ? (
						<button
							className="inline-flex items-center px-1 -ml-1 flex-column"
							onClick={() => {
							setLike(!isLike);
							deleteLikePost(postId, token, setCountLike, likes);
							}}
						>
							{/* <svg
							className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							>
							<path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
							</svg> */}
						</button>
						) : (
						<button
							className="inline-flex items-center px-1 -ml-1 flex-column"
							onClick={() => {
							setLike(!isLike);
								createLikePost(postId, token, setCountLike, likes);
							}}
						>
							{/* <svg
							className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
							></path>
							</svg> */}
						</button>
						)}
						<p>{likes}</p>
					</div>
					<CreateCommentPost postId={postId} />
					<div className="border p-4">
						<ul>
						{users &&
							comments.map((comment) => {
							return (
								<li key={comment.id}>
								<CommentsPost
									idComment={comment.id}
									comment={comment}
									users={users}
								/>
								</li>
							);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
