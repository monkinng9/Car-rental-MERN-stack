import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { updateCarItem } from '../../features/carItems/carItemSlice'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function EditCarFrom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { itemId, carID, carType } = useParams();

  const [typeOfCar, setTypeOfCar] = useState(carType);
  const [newCarID, setnewCarID] = useState(carID);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (typeOfCar === ''
      || typeOfCar === 'เลือกประเภทรถ'
      || !typeOfCar) {
      toast.warn('กรุณาเลือกประเภทรถ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let createCarReq = {
        itemId: itemId,
        carID: newCarID,
        carType: typeOfCar,
      }
      await dispatch(updateCarItem(createCarReq));
      navigate('/admin/cardashboard');
    }
  }


  return (
    <div>
      <header className="App-header">
        <h1>Edit Car Item: {carID}</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text"
              placeholder="กรอกทะเบียนรถ" value={newCarID}
              onChange={(e) => setnewCarID(e.target.value)}
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
            value={typeOfCar}
          >
            <option>เลือกประเภทรถ</option>
            <option value="กระบะ (Pick-up)">
              กระบะ (Pick-up)</option>
            <option value="รถตู้ (Van)">รถตู้ (Van)</option>
            <option value="รถเก๋ง (Sedan)">รถเก๋ง (Sedan)</option>
            <option value="รถจักรยายนต์ (Motorcycle)">
              รถจักรยายนต์ (Motorcycle)</option>
          </Form.Select>
          <Button className="btn me-3" variant="primary" type="button" onClick={() => {
            navigate('/admin/cardashboard/')
          }} >
            Cancle
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </header>
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
    </div>

  )
}

export default EditCarFrom