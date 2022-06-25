import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarItems, reset } from '../features/carItems/carItemSlice';
import { useNavigate } from 'react-router-dom';
import AddCarItemForm from '../components/AddCarItemForm';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import Form from 'react-bootstrap/Form';
import CarItemCard from '../components/CarItemCard';

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

	const [ carItemList, setCarItemList ] = useState([]);
	const [ filteredCarItems, setFilteredCarItems ] = useState([]);
	const [ carStatusFilter, setCarStatusFilter ] = useState('แสดงทั้งหมด');

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

 

	useEffect(
		() => {
			if (!user) {
				navigate('/login');
			} else {
				dispatch(getCarItems());
			}
			if (isError) {
				console.log(message);
			}
      return () => {
        dispatch(reset());
      };

		},
		[user, navigate, isError, message, dispatch]
	);

	const filterHandle = async (e) => {
		e.preventDefault();
		setCarStatusFilter(e.target.value);
    if (carStatusFilter === 'true') {
      const result = [];
      for (let item of carItems) {
        if (item.carAvailable === true) {
          result.push(item);
          setFilteredCarItems(result);
        }
      }
    }
    if (carStatusFilter === 'false') {
      const result = [];
      for (let item of carItems) {
        if (item.carAvailable === false) {
          result.push(item);
          setFilteredCarItems(result);
        }
      }
    }
    if (carStatusFilter === 'แสดงทั้งหมด') {
      setFilteredCarItems(carItems);
    }
	};

	if (isLoading) {
		return <Spinner />;
	}
	console.log(carStatusFilter.length);
	console.log(carItems.length);

	return (
		<div>
			<header className="App-header">
				<h1>Add Car Item</h1>
				<div className="p-3">
					<AddCarItemForm />
				</div>
				<hr />
				<Form.Select style={{ width: 200 }} onChange={filterHandle}>
					<option>แสดงทั้งหมด</option>
					<option value="true">แสดงรถที่ว่าง</option>
					<option value="false">แสดงรถที่ไม่ว่าง</option>
				</Form.Select>
				{filteredCarItems.length > 0 ? (
					<h3>{filteredCarItems.map((carItem) => <CarItemCard key={carItem._id} carItem={carItem} />)}</h3>
				) : (
					<h3>You don't have any car items yet</h3>
				)}
				<hr />
				<button className="btn" onClick={onLogout}>
					<FaSignOutAlt />Logout
				</button>
			</header>
		</div>
	);
}

export default Dashboard;
