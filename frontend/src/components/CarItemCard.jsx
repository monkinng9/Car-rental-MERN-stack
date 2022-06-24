import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { updateCarItem, getCarItems } from '../features/carItems/carItemSlice'



function CarItemCard({ carItem }) {

  const [carStatus, setCarStatus] = useState(carItem.carAvailable);
  const dispatch = useDispatch();

  const rentCar = async () => {
    let rentCarReq = {
      itemId: carItem._id,
      availableUpdate: false,
    }
    await dispatch(updateCarItem(rentCarReq));
    await dispatch(getCarItems());
    await setCarStatus(carItem.carAvailable);
  };

  const returnCar = async () => {
    let returnCarReq = {
      itemId: carItem._id,
      availableUpdate: true,
    }
    setCarStatus(true);
    await dispatch(updateCarItem(returnCarReq));
    dispatch(getCarItems());
    // window.location.reload(false);
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

export default CarItemCard