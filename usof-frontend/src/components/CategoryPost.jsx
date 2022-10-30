import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostCategory } from './slices/postsSlice.js';
import _ from 'lodash'
export default function CategoryPost ({ id }) {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.posts.postCategories[id]);

	useEffect(() => {
		dispatch(fetchPostCategory(id));
	}, []);
	return (
		categories && (
			<ul className="flex">
				{' '}
				{!_.isEmpty(categories) ? categories.map((category) => (
					<li key={category?.id}>
						<span title={category?.description}>
							{category?.title}
						</span>
					</li>
				)) : null}
			</ul>
		)
	);
};
