import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes.js';

const validationRegister = yup.object({
	email: yup.string().required('Cannot be blank').trim().email("Email must be a valid"),
	login: yup
		.string()
		.required('Cannot be blank')
		.trim()
		.min(6, 'Login short')
		.max(24, 'Login long'),
	password: yup
		.string()
		.required('Cannot be blank')
		.trim()
		.min(8, 'Password short'),
	passwordConfirm: yup
		.string()
		.required('Cannot be blank')
		.oneOf([yup.ref('password')], 'Passwords do not match')
});

export default function Register() {
	const inputRef = useRef();
	const [authFailed, setAuthFailed] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const formik = useFormik({
		initialValues: {
			email: '',
			login: '',
			password: '',
			passwordConfirm: '',
			terms: false,
		},
		validationSchema: validationRegister,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			if (values.terms !== true) {
				toast.warning(`You didn't agree with the terms and conditions of use!`);
				return;
			}
			try {
				const response = await axios.post(routes.registerPath(), values);
				toast.info(response.data.massage);
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
				<h1>Sing Up</h1>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="email" className="text-sm font-medium">
							Email
						</label>{' '}
						<span className="Errors">
							{formik.errors.email ? formik.errors.email : null}
						</span>
					</div>
					<div className="relative mt-1">
						<input
							id="email"
							className="inputField"
							name="email"
							placeholder="Enter email"
							ref={inputRef}
							onChange={formik.handleChange}
							value={formik.values.email}
							autoComplete="email"
						/>
					</div>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="login" className="text-sm font-medium">
							Login
						</label>{' '}
						<span className="Errors">
							{formik.errors.login ? formik.errors.login : null}
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
						</label>{' '}
						<span className="Errors">
							{formik.errors.password ? formik.errors.password : null}
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
				</div>
				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password-confirm" className="text-sm font-medium">
							Password confirm
						</label>{' '}
						<span className="Errors">
							{formik.errors.passwordConfirm ? formik.errors.passwordConfirm : null}
						</span>
					</div>
					<div className="relative mt-1">
						<input
							id="password-confirm"
							className="inputField"
							name="passwordConfirm"
							type="password"
							placeholder="Enter password confirm"
							onChange={formik.handleChange}
							value={formik.values.passwordConfirm}
							autoComplete="passwordConfirm"
						/>
					</div>
				</div>
				<div className="flex items-start">
					<div className="flex items-center h-5">
						<input
							id="terms"
							aria-describedby="terms"
							type="checkbox"
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 light:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
							onChange={formik.handleChange}
							checked={formik.values.terms}
						/>
						{' '}
						<label htmlFor="terms" className="font-light text-gray-500 light:text-gray-300" >
							I accept the{' '}
							<a className="text-indigo-600 transition ease-in-out delay-50 hover:opacity-75" href="#">
								Terms and Conditions
							</a>
						</label>
					</div>
				</div>
				<button type="submit" className="Submit_btn">
					Sign Up
				</button>
				<p className="text-sm text-gray-500">
					Already have an account?
					<a className="text-indigo-600 transition ease-in-out delay-50 hover:opacity-75 ml-2" href="/auth">
						Sign in
					</a>
				</p>
			</form>
		</div>
	);
};

