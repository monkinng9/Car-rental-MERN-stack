import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarItems, reset, rentCarItem, createBorrowCarform } from './../../features/carItems/carItemSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from './../../components/Spinner';




function ConfirmBorrow() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carItems, isLoading, isError, message } = useSelector((state) => state.carItems);

  const [carItem, setCarItem] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    navigate('/end-user/cardashboard');
  };


  const location = useLocation();
  console.log(location.state);

  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      }
      if (isError) {
        console.log(message);
      }
      dispatch(getCarItems());
      return () => {
        dispatch(reset());
      };
    },
    [user, navigate, isError, message, dispatch]
  );

  useEffect(() => {
    setCarItem(carItems.find(item => item._id === location.state.carItemID));

  }, [carItems, location.state.carItemID])

  useEffect(() => {
    if(carItem){
      if(carItem.carAvailable === false) {
        console.log('Car not available')
        setShow(true);
      } else if(carItem.carAvailable === true) {
        let rentCarItemreq = {
          itemId: location.state.carItemID,
          availableUpdate: false
        }
        dispatch(rentCarItem(rentCarItemreq));
        let borrowCarFormReq = {
          carItemID: location.state.carItemID,
          dueTime: location.state.dueTime
        }
        dispatch(createBorrowCarform(borrowCarFormReq));
        console.log('Car available')
        navigate('/end-user/cardashboard');
      }
    }
  }, [carItem, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log('Render ConfirmBorrow');

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>รถคันนี้ไม่ว่าง</Modal.Title>
        </Modal.Header>
        <Modal.Body>รถคันนี้ได้ถูกยืมแล้วกรุณาเลือกรถคันใหม่</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            กลับไปหน้ายืมรถ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConfirmBorrow