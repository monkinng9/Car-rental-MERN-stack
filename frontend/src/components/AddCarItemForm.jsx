import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createCarItem } from '../features/carItems/carItemSlice'

function AddCarItemForm() {
  const dispatch = useDispatch();
  
  
  const [carID, setCarID] = useState('');
  const [typeOfCar, setTypeOfCar] = useState('');

  const onSubmit = async(e) => {
    e.preventDefault();

    if (typeOfCar === ''
      || typeOfCar === 'เลือกประเภทรถ' ) {
        console.log('Not define type of car.')
    } else {
      let createCarReq = {
        carID: carID,
        carType: typeOfCar,
      }

      await dispatch(createCarItem(createCarReq));
    }

  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ทะเบียนรถ</Form.Label>
          <Form.Control type="text"
            placeholder="กรอกทะเบียนรถ" value={carID}
            onChange={(e) => setCarID(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Select
          className="mb-3"
          name="typeOfCar"
          aria-label="Default select example"
          onChange={(e) => {
            setTypeOfCar(e.target.value);
          }}
        >
          <option>เลือกประเภทรถ</option>
          <option value="กระบะ (Pick-up)">
            กระบะ (Pick-up)</option>
          <option value="รถตู้ (Van)">รถตู้ (Van)</option>
          <option value="รถเก๋ง (Sedan)">รถเก๋ง (Sedan)</option>
          <option value="รถจักรยายนต์ (Motorcycle)">
            รถจักรยายนต์ (Motorcycle)</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </>
  )
}

export default AddCarItemForm