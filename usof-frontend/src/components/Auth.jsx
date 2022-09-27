import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import Context from '../context/Context.js';

const validationAuth = yup.object({
	login: yup
		.string()
		.required('Cannot be blank')
		.trim()
		.min(6, 'login short')
		.max(24, 'login long'),
	password: yup
		.string()
		.required('Cannot be blank')
		.trim()
		.min(8, 'password short')
});

export default function Auth() {
	const { login } = useContext(Context);
	const inputRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const formik = useFormik({
		initialValues: {
			login: '',
			password: ''
		},
		validationSchema: validationAuth,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			try {
				const response = await axios.post(routes.authPath(), values);
				const currentUser = {
					token: response.data.accessToken,
					currentUser: response.data.currentUser,
				};
				localStorage.setItem('currentUser', JSON.stringify(currentUser));
				toast.info(response.data.massage);
				login();
				navigate('/');
			} catch (err) {
				if (err.isAxiosError && err.response.status === 400) {
					const responseErrors = err.response.data.errors.errors;
					console.log(err);
					responseErrors.map((err) => toast.error(`${err.param}: ${err.msg}`));
					inputRef.current?.select();
					return;
				}
				throw err;
			}
		}
	});

	return (
		<div className="divFormBlock">
			<form onSubmit={formik.handleSubmit} className="Main_Form">
				<h1>Sing In</h1>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="login" className="text-sm font-medium">
							Login
						</label>
						<span className="Errors">
							{formik.errors.login ? ' ' + formik.errors.login : null}
						</span>
					</div>
					<div className="relative mt-1">
						<input
							id="login"
							className="inputField"
							name="login"
							placeholder="Enter login"
							onChange={formik.handleChange}
							value={formik.values.login}
							autoComplete="login"
						/>
					</div>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="text-sm font-medium">
							Password
						</label>
						<span className="Errors">
							{formik.errors.password ? ' ' + formik.errors.password : null}
						</span>
					</div>
					<div className="relative mt-1">
						<input
							id="password"
							className="inputField"
							name="password"
							type="password"
							placeholder="Enter password"
							onChange={formik.handleChange}
							value={formik.values.password}
							autoComplete="password"
						/>
					</div>
					<p className="text-sm text-gray-500">
					Forgot password?
					<a className="text-indigo-600 transition ease-in-out delay-50 hover:opacity-75 ml-2" href="/resetpassword">
						Reset It
					</a>
				</p>
				</div>
				<button type="submit" className="Submit_btn">
					Sign In
				</button>

				<p className="text-sm text-gray-500">
					Don't have an account?
					<a className="text-indigo-600 transition ease-in-out delay-50 hover:opacity-75 ml-2" href="/register">
						Sign Up
					</a>
				</p>
			</form>
		</div>
	);
};

