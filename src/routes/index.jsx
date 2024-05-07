import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import {loader as loginLoader} from './login/loader';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />,
        loader: loginLoader,
        index: true,
      },
      {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);

export default router;
