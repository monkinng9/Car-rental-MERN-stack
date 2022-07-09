import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCarItems, reset } from '../../features/carItems/carItemSlice';
import { getBorrowCarForm } from '../../features/borrowCarForm/borrowCarFormSlice';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Form from 'react-bootstrap/Form';
import CarItemCard from '../../components/end-user/CarItemCardEndUser';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../components/navbar/Navbar';

function DashboardEndUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);
  const { borrowForms } = useSelector((state) => state.borrowCarForms);

  const [filteredCarItems, setFilteredCarItems] = useState([]);
  const [carStatusFilter, setCarStatusFilter] = useState('true');

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      } else {
        dispatch(getCarItems());
        dispatch(getBorrowCarForm());
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

  useEffect(() => {
    let result = [];
    result = carItems.filter(item => item.carAvailable === true);
    setFilteredCarItems(result);
    if (carStatusFilter === 'แสดงทั้งหมด' || carStatusFilter === null) {
      setFilteredCarItems(carItems);
    } else if (carStatusFilter === 'false') {
      result = carItems.filter(item => item.carAvailable === false);
      setFilteredCarItems(result);

    }

  }, [carItems, carStatusFilter]);

  useEffect(() => {
    if (borrowForms !== '') {
      let found
        = Array.isArray(borrowForms) ?
          borrowForms.find(borrowForm => borrowForm.status === 'Rented') : ('');
      if (found) {
        navigate('/end-user/');
      }
    }
  }, [borrowForms])

  const filterHandle = async (e) => {
    e.preventDefault();
    setCarStatusFilter(e.target.value);
    console.log(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <main className="App-header">
        <Row>
          <Col>
            <h1>End-user: Add Car Item {" "}
              <span><Link to="/end-user/">Go to Profile</Link></span></h1>
            <Form.Select className="SelectForm mt-3"
              style={{ width: 200 }} onChange={filterHandle} >
              <option value="true">แสดงรถที่ว่าง</option>
              <option value="แสดงทั้งหมด">แสดงทั้งหมด</option>
              <option value="false">แสดงรถที่ไม่ว่าง</option>
            </Form.Select>
            <hr />

            {filteredCarItems.length > 0 ? (
              <Row xs={1} md={3} className="g-4">
                {filteredCarItems.map((item) =>
                  <CarItemCard key={item._id} carItem={item} />)}
              </Row>
            ) : (
              <h3>ไม่มีรถที่ว่าง</h3>
            )}
          </Col>
        </Row>
      </main>

    </>

  );
}

export default DashboardEndUser;