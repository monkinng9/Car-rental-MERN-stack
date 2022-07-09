import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import "./Register.styles.scss"

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
					<h3 className="Auth-form-title">ลงชื่อเข้าใช้งาน <br/><span> ระบบยืมรถกองงาน</span></h3>
					<div className="text-center">
						ยังไม่ลงทะเบียน? <Link to='/register' className="link-primary">ลงทะเบียน</Link>
					</div>
					<div className="form-group mt-3">
						<label>อีเมล:</label>
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
						<label>รหัสผ่าน</label>
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
