import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register,reset } from '../features/auth/authSlice'
import './Register.styles.scss';

function Register() {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        role: 'end-user',
      }

      dispatch(register(userData))
    }
  }

	return (
		<div className="Auth-form-container">
			<form className="Auth-form" onSubmit={onSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">ลงทะเบียน</h3>
					<div className="text-center">
						ลงทะเบียนเรียบร้อยแล้ว? <Link to='/login' className="link-primary" >เข้าสู่ระบบ</Link>
					</div>
					<div className="form-group mt-3">
						<label>ชื่อเต็ม</label>
						<input type="text" 
              className="form-control mt-1" 
              placeholder="ชื่อเต็ม"
              name='name'
              value={name}
              onChange={onChange} />
					</div>
					<div className="form-group mt-3">
						<label>ที่อยู่อีเมล (Email Address)</label>
						<input type="อีเมล" 
              className="form-control mt-1" 
              placeholder="Email Address"
              name='email'
              value={email}
              onChange={onChange} />
					</div>
					<div className="form-group mt-3">
						<label>รหัสผ่าน (Password)</label>
						<input type="password" 
              className="form-control mt-1" 
              placeholder="รหัสผ่าน (Password)"
              name='password'
              value={password}
              onChange={onChange} />
					</div>
					<div className="form-group mt-3">
						<label>ยืนยันรหัสผ่าน (Confirm Password)</label>
						<input type="password" 
              className="form-control mt-1" 
              placeholder="ยืนยันรหัสผ่าน (Confirm Password)"
              name='password2'
              value={password2}
              onChange={onChange} />
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

export default Register;
