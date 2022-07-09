import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./CarItemCardEndUser.styles.scss";




function CarItemCardEndUser({ carItem }) {
  const navigate = useNavigate();
  const [carStatus, setCarStatus] = useState(carItem.carAvailable);

  useEffect(() => {
    setCarStatus(carItem.carAvailable)
  }, [carItem.carAvailable])

  const rentCar = async () => {
    navigate(`/end-user/cardashboard/borrowCarForm/${carItem._id}`)
  };

  return (
    <Col>
      <Card className="mb-4" >
        <Card.Body>
          <Card.Title>{carItem.carID}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{carItem.carType}</Card.Subtitle>
          <Card.Text >
            {carStatus === true ? (<>ว่าง</>) : (<>ไม่ว่าง</>)}
          </Card.Text>
          {carStatus === true ?
            (<Button variant="success" 
              onClick={rentCar}>ยืมรถ</Button>)
            : (<Button variant="warning"
              disabled>รถไม่ว่าง</Button>)}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CarItemCardEndUser