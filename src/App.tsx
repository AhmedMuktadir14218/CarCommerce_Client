import React, { useEffect } from 'react';
import AppRoutes from './routes';
import { useAppDispatch } from './redux/hooks';
import { setCredentials } from './redux/features/auth/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  // Restore authentication state on app mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      dispatch(setCredentials({ user: JSON.parse(storedUser), token: storedToken }));
    }
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
