import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { deleteCarItem } from '../../features/carItems/carItemSlice';
import CloseButton from 'react-bootstrap/CloseButton';
import {AiFillEdit} from 'react-icons/ai';
import './CarItemCardAdmin.styles.scss'
import { useNavigate } from 'react-router-dom';

function CarItemCardAdmin({ carItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCar = async () => {
    dispatch(deleteCarItem(carItem._id));
  }

  const goEditForm = () => {
    navigate(`/admin/editcar/${carItem._id}/${carItem.carID}/${carItem.carType}`)
  }

  return (
    <Card className="mb-4" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{carItem.carID}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{carItem.carType}</Card.Subtitle>
        <CloseButton className="btn-sm" onClick={deleteCar}/>
        <button className="ms-3"><AiFillEdit  onClick={goEditForm}/></button>
      </Card.Body>
    </Card>
  )
}

export default CarItemCardAdmin