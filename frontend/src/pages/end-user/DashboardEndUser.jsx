import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarItems, reset } from '../../features/carItems/carItemSlice';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';
import Form from 'react-bootstrap/Form';
import CarItemCard from '../../components/end-user/CarItemCardEndUser';

function DashboardEndUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

  const [filteredCarItems, setFilteredCarItems] = useState([]);
  const [carStatusFilter, setCarStatusFilter] = useState('แสดงทั้งหมด');

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

  useEffect(() => {
    const result = [];
    if (carStatusFilter === 'true') {
      for (let item of carItems) {
        if (item.carAvailable === true) {
          result.push(item);
          setFilteredCarItems(result);
        }
      }
    } else if (carStatusFilter === 'false') {
      for (let item of carItems) {
        if (item.carAvailable === false) {
          result.push(item);
          setFilteredCarItems(result);
        }
      }
    } else {
      setFilteredCarItems(carItems);
    }

  }, [carItems, carStatusFilter])

  const filterHandle = async (e) => {
    e.preventDefault();
    setCarStatusFilter(e.target.value);

  };

  if (isLoading) {
    return <Spinner />;
  }

  console.log('Render DashboardEndUser');

  return (
    <div>
      <header className="App-header">
        <h1>End-user: Add Car Item</h1>
        <hr />
        <Form.Select style={{ width: 200 }} onChange={filterHandle}>
          <option>แสดงทั้งหมด</option>
          <option value="true">แสดงรถที่ว่าง</option>
          <option value="false">แสดงรถที่ไม่ว่าง</option>
        </Form.Select>
        <hr />
        {filteredCarItems.length > 0 ? (
          <h3>{filteredCarItems.map((item) =>
            <CarItemCard key={item._id} carItem={item} />)}</h3>
        ) : (
          <h3>You don't have any car items yet</h3>
        )}
        <button className="btn" onClick={onLogout}>
          <FaSignOutAlt />Logout
        </button>
      </header>

    </div>

  );
}

export default DashboardEndUser;
