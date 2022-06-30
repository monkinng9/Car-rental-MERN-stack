import Reac, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarItems, reset } from './../../features/carItems/carItemSlice';
import Spinner from './../../components/Spinner';


function BorrowCarForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.auth);

  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

  const { itemId } = useParams();
  const [carItem, setCarItem] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [currentDateThai, setCurrentDateThai] = useState();
  
  

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      }
      if (isError) {
        console.log(message);
      }

      dispatch(getCarItems());

      let newCurrentDate = new Date();
      let date_raw = newCurrentDate.getDate();
      let month_raw = newCurrentDate.getMonth() + 1;
      let year = newCurrentDate.getFullYear();
      let hours = newCurrentDate.getHours();
      let min = newCurrentDate.getMinutes();
      setCurrentTime(newCurrentDate.toLocaleTimeString('en-US'))
      setCurrentDate(newCurrentDate);

      let newCurrentDateThai = newCurrentDate.toLocaleDateString("th-TH", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentDateThai(newCurrentDateThai);

      return () => {
        dispatch(reset());
      };
    },
    [user, navigate, isError, message, dispatch]
  );

  useEffect(() => {
    setCarItem(carItems.find(item => item._id === itemId));

  }, [carItems, itemId]);

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
      <header className="App-header">
        <h3>Car ID: {!carItem ? (''): (carItem.carID)}</h3>
        <h3>Type of Car: {!carItem ? (''): (carItem.carType)}</h3>
        <h3>Who borrow: {user.name}</h3>
        <h3>Rent Time: {currentDateThai} เวลา {currentTime}</h3>
        <h3>Due Time: {currentDateThai} เวลา {currentTime}</h3>
      </header>

    </>
  )
}

export default BorrowCarForm