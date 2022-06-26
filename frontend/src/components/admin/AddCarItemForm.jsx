import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createCarItem } from '../../features/carItems/carItemSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCarItemForm() {
  const dispatch = useDispatch();


  const [carID, setCarID] = useState('');
  const [typeOfCar, setTypeOfCar] = useState('');

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
        carID: carID,
        carType: typeOfCar,
      }
      await dispatch(createCarItem(createCarReq));
      toast.warn('ได้ทำการเพิ่มรถแล้ว', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setCarID('');
    }

  }

  console.log(typeOfCar);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
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

    </>
  )
}

export default AddCarItemForm