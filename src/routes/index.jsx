import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Login from '../pages/Auth/Login';
import App from '../App';
import Signup from '../pages/Auth/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
        index: true,
      },
      {
        path: '/signup',
        element: <Signup />,
      }
    ],
  },
]);

export default router;
