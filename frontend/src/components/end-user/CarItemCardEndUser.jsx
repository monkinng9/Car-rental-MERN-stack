import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { rentCarItem, getCarItems } from '../../features/carItems/carItemSlice';
import { useNavigate } from 'react-router-dom';




function CarItemCardEndUser({ carItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const [carStatus, setCarStatus] = useState(carItem.carAvailable);

  useEffect(() => {
    setCarStatus(carItem.carAvailable)
  }, [carItem.carAvailable],)

  const rentCar = async () => {
    navigate(`/end-user/cardashboard/borrowCarForm/${carItem._id}`)
  };

  const returnCar = async () => {
    let returnCarReq = {
      itemId: carItem._id,
      availableUpdate: true,
    }
    setCarStatus(true);
    await dispatch(rentCarItem(returnCarReq));
    dispatch(getCarItems());
  };

  return (
    <Card className="mb-4" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{carItem.carID}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{carItem.carType}</Card.Subtitle>
        <Card.Text style={{ fontSize: 24 }}>
          {carStatus === true ? (<>ว่าง</>) : (<>ไม่ว่าง</>)}
        </Card.Text>
        {carStatus === true ?
          (<Button variant="success" style={{ fontSize: 20 }}
            onClick={rentCar}>ยืมรถ</Button>)
          : (<Button variant="warning" style={{ fontSize: 20 }}
            onClick={returnCar}>คืนรถ</Button>)}
      </Card.Body>
    </Card>
  )
}

export default CarItemCardEndUser