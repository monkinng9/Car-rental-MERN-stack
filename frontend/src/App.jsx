import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { getCarItems, reset } from './features/carItems/carItemSlice';
import Spinner from './components/Spinner';
import CarItemCard from './components/CarItemCard';
import AddCarItemForm from './components/AddCarItemForm'
import Form from 'react-bootstrap/Form';


function App() {
  const dispatch = useDispatch();


  const { carItems, isLoading, isError, message } = useSelector(
    (state) => state.carItems,
  );


  const [filteredCarItems, setFilteredCarItems] = useState([]);
  const [carStatusFilter, setCarStatusFilter] = useState('แสดงทั้งหมด')

  useEffect(() => {
    setFilteredCarItems(carItems);
  }, [carItems])

  useEffect(() => {
    dispatch(getCarItems());
    setFilteredCarItems(carItems);


    return () => {
      dispatch(reset());
    }

  }, [isError, message, dispatch]);

  useEffect(() => {
    if (carStatusFilter === 'true') {
      const result = [];
      for (let item of carItems) {
        if (item.carAvailable === true) {
          result.push(item);
          setFilteredCarItems(result)
        }
      }
    }
    if (carStatusFilter === 'false') {
      const result = [];
      for (let item of carItems) {
        if (item.carAvailable === false) {
          result.push(item);
          setFilteredCarItems(result)
        }
      }
    }
    if (carStatusFilter === 'แสดงทั้งหมด') {
      setFilteredCarItems(carItems);
    }
  }, [carStatusFilter]);


  const filterHandle = async (e) => {
    e.preventDefault();
    setCarStatusFilter(e.target.value);
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add Car Item</h1>
        <div className="p-3"><AddCarItemForm /></div>
        <hr />
        <Form.Select style={{ width: 200 }}
          onChange={filterHandle} >
          <option>แสดงทั้งหมด</option>
          <option value="true">แสดงรถที่ว่าง</option>
          <option value="false">แสดงรถที่ไม่ว่าง</option>
        </Form.Select>
        <hr />
        {filteredCarItems.length > 0 ? (
          <h3>
            {filteredCarItems.map(carItem =>
              <CarItemCard key={carItem._id} carItem={carItem} />
            )}
          </h3>
        ) : (
          <h3>You don't have any car items yet</h3>
        )}

      </header>
    </div>
  );
}

export default App;
