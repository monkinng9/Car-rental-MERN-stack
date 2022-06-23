import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function CarItemCard({ carItem }) {

  const rentCar = () => {};

  return (
    <Card className="mb-4" style={{ width: '30rem' }}>
      <Card.Body>
        <Card.Title>{carItem.carID}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{carItem.carType}</Card.Subtitle>
        <Card.Text style={{ fontSize: 24 }}>
          {carItem.carAvailable === true ? (<>ว่าง</>) : (<>ไม่ว่าง</>)}
        </Card.Text>
        {carItem.carAvailable === true ? 
          (<Button variant="primary" onClick={rentCar} 
            style={{ fontSize: 20 }}>ยืมรถ</Button>) 
          : (<Button variant="warning" onClick={rentCar} 
            style={{ fontSize: 24 }}>คืนรถ</Button>)}
        
      </Card.Body>
    </Card>
  )
}

export default CarItemCard