import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarItems, reset } from '../features/carItems/carItemSlice';
import Spinner from '../components/Spinner';
import CarItemCard from '../components/CarItemCard';
import AddCarItemForm from '../components/AddCarItemForm';
import Form from 'react-bootstrap/Form';

function Dashboard() {
	const dispatch = useDispatch();

	const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

	const [ filteredCarItems, setFilteredCarItems ] = useState([]);
	const [ carStatusFilter, setCarStatusFilter ] = useState('แสดงทั้งหมด');

	// useEffect(
	// 	() => {
	// 		setFilteredCarItems(carItems);
	// 	},
	// 	[ carItems ]
	// );

	// useEffect(
	// 	() => {
	// 		dispatch(getCarItems());
	// 		setFilteredCarItems(carItems);

	// 		return () => {
	// 			dispatch(reset());
	// 		};
	// 	},
	// 	[ isError, message, dispatch ]
	// );


	// if (isLoading) {
	// 	return <Spinner />;
	// }

	return (
		<div>
			<header className="App-header">
				<h1>Add Car Item</h1>
				<div className="p-3">
					<AddCarItemForm />
				</div>
				<hr />
			</header>
		</div>
	);
}

export default Dashboard;
