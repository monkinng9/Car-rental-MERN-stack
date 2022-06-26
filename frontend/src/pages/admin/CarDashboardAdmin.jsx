import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCarItems, reset } from '../../features/carItems/carItemSlice';
import { logout } from '../../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import CarItemCardAdmin from './../../components/CarItemCardAdmin';
import Spinner from '../../components/Spinner';


function CarDashboardAdmin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      } else {
        dispatch(getCarItems());
      }
      if (isError) {
      }
      return () => {
        dispatch(reset());
      };

    },
    [user, navigate, isError, message, dispatch]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <header className="App-header">
      <h1>Admin: Car Item</h1>
        {carItems.length > 0 ? (
          <h3>{carItems.map((item) =>
            <CarItemCardAdmin key={item._id} carItem={item} />)}</h3>
        ) : (
          <h3>You don't have any car items yet</h3>
        )}

        <button className="btn" onClick={onLogout}>
          <FaSignOutAlt />Logout
        </button>
      </header>
    </div>
  )
}

export default CarDashboardAdmin