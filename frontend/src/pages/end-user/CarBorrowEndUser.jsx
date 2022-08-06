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
import { getCurrentDate } from '../../components/Date';
import InputGroup from 'react-bootstrap/InputGroup';

function DashboardEndUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);
  const { borrowForms } = useSelector((state) => state.borrowCarForms);

  const [filteredCarItems, setFilteredCarItems] = useState([]);
  const [carStatusFilter, setCarStatusFilter] = useState('แสดงทั้งหมด');
  const [currentDateThai, setCurrentDateThai] = useState();

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      } else {
        dispatch(getCarItems());
        dispatch(getBorrowCarForm());
        let newCurrentDateThai = getCurrentDate().toLocaleDateString("th-TH", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setCurrentDateThai(newCurrentDateThai);
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
    if (carStatusFilter === 'แสดงทั้งหมด' || carStatusFilter === 'เลือกสถานะรถ' 
      || carStatusFilter === null) {
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
          <h3 className="mb-3">วันที่ {currentDateThai}</h3>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                ค้นหาทะเบียน
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Col>
          <Col>
            <div className="mb-3 ">
              <Form.Select className="SelectForm"
                style={{ width: 200 }} >
              </Form.Select>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <Form.Select className="SelectForm"
                style={{ width: 200 }} onChange={filterHandle} >
                <option disabled selected hidden>เลือกสถานะรถ</option>
                <option value="แสดงทั้งหมด">แสดงทั้งหมด</option>
                <option value="true">แสดงรถที่ว่าง</option>
                <option value="false">แสดงรถที่ไม่ว่าง</option>
              </Form.Select>
            </div>
          </Col>

          <hr />
        </Row>
        <Row>
          <Col>
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
