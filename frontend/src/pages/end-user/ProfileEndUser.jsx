
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBorrowCarForm, updateBorrowCarForm, reset } from './../../features/borrowCarForm/borrowCarFormSlice';
import Spinner from './../../components/Spinner';
import { logout } from './../../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { rentCarItem  } from './../../features/carItems/carItemSlice';
function ProfileEndUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { borrowForms, isLoading, isError, message } = useSelector((state) => state.borrowCarForms);
  
  const [currentBorrowForm, setCurrentBorrowForm] = useState();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      }
      if (isError) {
        console.log(message);
      }
      dispatch(getBorrowCarForm());
      return () => {
        dispatch(reset());
      };
    },
    [user, navigate, isError, message, dispatch]
  );

  useEffect(() => {
    if (borrowForms !== '') {
      let found
        = Array.isArray(borrowForms) ?
          borrowForms.find(borrowForm => borrowForm.status === 'Rented') : ('');
      setCurrentBorrowForm(found);
    }
  }, [borrowForms])

  const returnCar = async () => {
    const returnCarReq = {
      itemId: currentBorrowForm.carItemID,
      availableUpdate: true,
    };
    await dispatch(rentCarItem(returnCarReq));

    const formReq = {
      _id: currentBorrowForm._id,
      status: 'Returned',
    }
    await dispatch(updateBorrowCarForm(formReq));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <header className="App-header">
        <h1>Welcome {user.name}</h1>
        {currentBorrowForm ?
          (<Card className="mb-4" style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>{currentBorrowForm ? (currentBorrowForm.carID) : ('')}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{currentBorrowForm ? (currentBorrowForm.carType) : ('')}</Card.Subtitle>
              <Button variant="warning" style={{ fontSize: 20 }}
                onClick={returnCar}>คืนรถ</Button>
            </Card.Body>
          </Card>) : (<Link to='cardashboard'>Go to Car Dashboard</Link>)}
        <button className="btn" onClick={onLogout}>
          <FaSignOutAlt />Logout
        </button>
      </header>
    </div>
  )
}

export default ProfileEndUser