import Login from '../../pages/Auth/Login';
import Signup from '../../pages/Auth/Signup';
import { loader as loginLoader } from './login/loader';

export default [
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
];
