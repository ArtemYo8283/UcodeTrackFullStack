import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../routes.js';

const validationPassword = yup.object({
	new_password: yup
		.string()
		.required('Cannot be blank')
		.trim()
		.min(8, 'Password short'),
	new_password_confirm: yup
		.string()
		.required('Cannot be blank')
		.oneOf([yup.ref('new_password')], 'Passwords do not match')
});

export default function SetNewPassword() {
	const inputRef = useRef();
	const navigate = useNavigate();
	const [isInvalidToken, setInvalidToken] = useState(false);
	const accessToken = useParams().token.split('~').join('.');
	useEffect(() => {
		inputRef.current?.focus();
		const fetch = async () => {
			try {
				await axios.get(routes.validToken(accessToken));
			} catch (err) {
				setInvalidToken(true);
			}
		};
	fetch();
	}, []);
	const formik = useFormik({
		initialValues: {
			new_password: ''
		},
		validationSchema: validationPassword,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			try {
				const response = await axios.post(routes.setNewPassword(accessToken), values);
				toast.info(response.data.msg);
				localStorage.removeItem('new_passwordToken');
				navigate('/');
			} catch (err) {
				if (err.isAxiosError && err.response.status === 400) {
					const responseErrors = err.response.data.errors.errors;
					responseErrors.map((err) => toast.error(`${err.param}: ${err.msg}`));
					inputRef.current?.select();
					return;
				}
				throw err;
			}
		},
	});

	return isInvalidToken ? (
			<div className="divFormBlock">
				<div className="Main_Form">
					Invalid link
				</div>
			</div>
		) : 
		(
			<div className="divFormBlock">
				<form onSubmit={formik.handleSubmit} className="Main_Form">
					<h1>New password</h1>
					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<span className="Errors">
								{formik.errors.new_password ? ' ' + formik.errors.new_password : null}
							</span>
						</div>
						<div className="relative mt-1">
							<input
								id="password"
								className="inputField"
								name="new_password"
								placeholder="Enter password"
								ref={inputRef}
								onChange={formik.handleChange}
								value={formik.values.new_password}
								autoComplete="password"
								type="password"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="text-sm font-medium">
								Password confirm
							</label>
							<span className="Errors">
								{formik.errors.new_password_confirm ? ' ' + formik.errors.new_password_confirm : null}
							</span>
						</div>
						<div className="relative mt-1">
							<input
								id="confirm-password"
								className="inputField"
								name="new_password_confirm"
								placeholder="Enter confirm password"
								onChange={formik.handleChange}
								value={formik.values.new_password_confirm}
								type="password"
							/>
						</div>
					</div>
					<br />
					<button type="submit" className="Submit_btn">
						Send password
					</button>
				</form>
			</div>
		);
}
