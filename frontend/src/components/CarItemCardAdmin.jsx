import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { deleteCarItem } from '../features/carItems/carItemSlice';
import CloseButton from 'react-bootstrap/CloseButton';




function CarItemCardAdmin({ carItem }) {

  const dispatch = useDispatch();

  const deleteCar = async () => {
    dispatch(deleteCarItem(carItem._id));
  }
  return (
    <Card className="mb-4" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{carItem.carID}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{carItem.carType}</Card.Subtitle>
        <CloseButton className="ms-3 btn-sm" onClick={deleteCar}/>
      </Card.Body>
    </Card>
  )
}

export default CarItemCardAdmin