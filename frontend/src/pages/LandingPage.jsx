import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);


  useEffect(
    () => {
      if (!user) {
        navigate('/login');
      }
      else if (user.role === 'end-user') {
        navigate('/end-user/cardashboard');
      }

      else if (user.role === 'admin') {
        navigate('/admin/cardashboard');
      }

      if (isError) {
        console.log(message);
      }
    },
    [user, navigate, isError, message, dispatch]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <header className="App-header">
      </header>

    </div>

  );
}

export default LandingPage;
