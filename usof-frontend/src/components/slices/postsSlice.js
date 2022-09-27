import {
	createAsyncThunk,
	createSlice,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

export const fetchPosts = createAsyncThunk('posts/allPost', async () => {
	const response = await axios.get(routes.allPost());
	return response.data;
});

export const fetchInfoPost = createAsyncThunk(
	'posts/getPostById',
	async ({postId, token}) => {
		const response = await axios.get(routes.getPostsById(postId, token));
		return response.data;
	}
);
export const fetchPostCategory = createAsyncThunk(
	'posts/postCategories',
	async (id) => {
		const response = await axios.get(routes.categoriesPost(id));
		return response.data;
	}
);

export const fetchPostLike = createAsyncThunk('posts/postLike', async (id) => {
	const response = await axios.get(routes.likesPost(id));
	return response.data;
});

export const fetchPostComments = createAsyncThunk(
	'posts/postComments',
	async (id) => {
		const response = await axios.get(routes.commentsPost(id));
		return response.data;
	}
);

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
	postCategories: {},
	postLikes: {},
	postComments: {},
	error: null,
	loading: true,
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: postsAdapter.addOne,
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchPosts.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchPosts.fulfilled, (state, { payload }) => {
			state.loading = false;
			postsAdapter.addMany(state, payload);
		})
		.addCase(fetchPosts.rejected, (state) => {
			state.loading = false;
			state.error = 'Error load post try later :(';
		})
		.addCase(fetchPostCategory.fulfilled, (state, { payload }) => {
			state.postCategories[payload.postId] = payload.category;
		})
		.addCase(fetchPostLike.fulfilled, (state, { payload }) => {
			state.postLikes[payload.postId] = {
			countLike: payload.countLike,
			likeInfo: payload.like,
			};
		})
		.addCase(fetchPostComments.fulfilled, (state, { payload }) => {
			state.postComments[payload.postId] = {
			countComments: payload.countComments,
			comments: payload.comments,
			};
		})
		.addCase(fetchInfoPost.pending, (state, { payload }) => {
			state.loading = true;
		})
		.addCase(fetchInfoPost.fulfilled, (state, { payload }) => {
			state.entities[payload[0].id] = payload[0];
			state.loading = false;
		})
		.addCase(fetchInfoPost.rejected, (state) => {
			state.error = 'This page not found';
			state.loading = false;
		});
	},
});

export const { action } = postsSlice;

export const selectors = postsAdapter.getSelectors((state) => state.posts);

export const getFetchStatus = (state) => state.posts.loading;

export default postsSlice.reducer;
