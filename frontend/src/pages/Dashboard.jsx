import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarItems, reset } from '../features/carItems/carItemSlice';
import { Link, useNavigate } from 'react-router-dom';
import AddCarItemForm from '../components/AddCarItemForm';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../features/auth/authSlice';

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

	const [ filteredCarItems, setFilteredCarItems ] = useState([]);
	const [ carStatusFilter, setCarStatusFilter ] = useState('แสดงทั้งหมด');

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	useEffect(() => {
		if (!user) {
			console.log('No user');
      navigate('/login');

		} else {
			console.log(user);
		}
	});

	return (
		<div>
			<header className="App-header">
				<h1>Add Car Item</h1>
				<div className="p-3">
					<AddCarItemForm />
				</div>
				<hr />
				<button className="btn" onClick={onLogout}>
					<FaSignOutAlt />Logout
				</button>
			</header>
		</div>
	);
}

export default Dashboard;
