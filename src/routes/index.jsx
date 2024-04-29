import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Login from '../pages/Auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
