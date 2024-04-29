import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Login from '../pages/Auth/Login';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
