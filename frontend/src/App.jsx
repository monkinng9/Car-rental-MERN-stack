import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { getCarItems, reset } from './features/carItems/carItemSlice';
import Spinner from './components/Spinner';
import CarItemCard from './components/CarItemCard';



function App() {
  const dispatch = useDispatch();

  const { carItems, isLoading, isError, message } = useSelector(
    (state) => state.carItems,
  );

  useEffect(() => {
    dispatch(getCarItems());
    return () => {
      dispatch(reset());
    }
    if (isError) {
      console.log(message)
    }

  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="App">
      <header className="App-header">
        {carItems.length > 0 ? (
          <h3>
            {carItems.map(carItem =>
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
