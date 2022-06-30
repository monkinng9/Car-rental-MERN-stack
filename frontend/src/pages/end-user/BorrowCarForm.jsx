import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarItems, reset } from './../../features/carItems/carItemSlice';
import Spinner from './../../components/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';



function BorrowCarForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.auth);

  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

  const { itemId } = useParams();
  const [carItem, setCarItem] = useState([]);
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [returnDate, setReturnDate] = useState(currentDate);
  const [returnDateThai, setReturnDateThai] = useState(currentDate);
  const [currentDateThai, setCurrentDateThai] = useState();
  const [borrowPeriod, setBorrowPeriod] = useState();

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
      setCurrentTime(newCurrentDate.toLocaleTimeString('en-US'));
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

  useEffect(() => {
    const newBorrowPeriod = Number(borrowPeriod);
    let newReturnDate = new Date();
    newReturnDate.setDate(newReturnDate.getDate() + newBorrowPeriod);
    setReturnDate(newReturnDate);
    let newReturnDateThai = newReturnDate.toLocaleDateString("th-TH", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setReturnDateThai(newReturnDateThai);
  }, [borrowPeriod])

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (borrowPeriod === "0" || !borrowPeriod) {
      toast.warn('กรุณาเลือกระยะเวลาการยืม', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      navigate('/end-user/cardashboard/borrowCarForm/confirm',
        {
          state: {
            user: user._id,
            carItemID: itemId,
            dueTime: returnDate,
          }
        }
      );
    }
  }

  console.log('Render BorrowCarForm');


  return (
    <>
      <header className="App-header">
        <h1>แบบฟอร์มการยืมรถ: {!carItem ? ('') : (carItem.carID)}</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 form-group" style={{ "width": "450px" }}>
            <Form.Label style={{ fontSize: 24 }}>ทะเบียนรถ</Form.Label>
            <Form.Control type="text"
              value={!carItem ? ('') : (carItem.carID)}
              disabled
            />
            <Form.Label className="mt-3" style={{ fontSize: 24 }}>ประเภทรถ</Form.Label>
            <Form.Control type="text"
              value={!carItem ? ('') : (carItem.carType)}
              disabled
            />
            <Form.Label className="mt-3" style={{ fontSize: 24 }}>ผู้ยืม</Form.Label>
            <Form.Control type="text"
              value={user.name}
              disabled
            />
            <Form.Label className="mt-3" style={{ fontSize: 24 }}>เวลายืม</Form.Label>
            <Form.Control type="text"
              value={`${currentDateThai} เวลา ${currentTime}`}
              disabled
            />
            <Form.Label className="mt-3" style={{ fontSize: 24 }}>ระยะเวลายืม</Form.Label>
            <Form.Select
              onChange={(e) => {
                setBorrowPeriod(e.target.value);
              }}>
              <option value='0'>เลือกระยะเวลาการยืม</option>
              <option value="1">1 วัน</option>
              <option value="3">3 วัน</option>
              <option value="7">7 วัน</option>
            </Form.Select>
            <Form.Label className="mt-3" style={{ fontSize: 24 }}>เวลาที่ต้องคืน</Form.Label>
            <Form.Control type="text"
              value={returnDateThai === "Invalid Date" ? ("") : (`${returnDateThai} เวลา ${currentTime}`)}
              disabled
            />
          </Form.Group>

          <Button className="btn me-3" variant="primary" type="button" onClick={() => {
            navigate('/admin/cardashboard/')
          }} >
            Cancle
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </header>


    </>
  )
}

export default BorrowCarForm