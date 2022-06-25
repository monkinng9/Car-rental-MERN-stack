import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}

			if (isSuccess || user) {
				navigate('/');
			}

			dispatch(reset());
		},
		[ user, isError, isSuccess, message, navigate, dispatch ]
	);

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password
		};

		dispatch(login(userData));
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="Auth-form-container">
			<form className="Auth-form" onSubmit={onSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="text-center">
						Not registered yet? <span className="link-primary">Sign Up</span>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Enter email"
							name="email"
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
							name="password"
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className="d-grid gap-2 mt-3 mb-3">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
