import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostCategory, selectors } from './slices/postsSlice.js';

const MassageCategory = ({ category }) => {
	const [isShow, setShow] = useState(false);
	return (
		<>
			<span
				onMouseOver={() => setShow(!isShow)}
				onMouseOut={() => setShow(!isShow)}
				className="ml-4 px-3 py-1 text-xs text-white uppercase bg-orange-400 rounded-full dark:bg-blue-300 dark:text-blue-900"
				title={category.description}
			>
				{category.title}
			</span>
			<p className={`absolute ${isShow ? 'blocl' : 'hidden'}`}>amogus</p>
		</>
	);
};

export default function CategoryPost ({ id }) {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.posts.postCategories);

	useEffect(() => {
		dispatch(fetchPostCategory(id));
	}, []);
	return (
		categories[id] && (
		<ul className="flex">
			{' '}
			{categories[id].map((category) => (
			<li key={category.id}>
				<MassageCategory category={category} />
			</li>
			))}
		</ul>
		)
	);
};
