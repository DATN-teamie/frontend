import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import authRoute from './auth/authRoute';
import topBarRoute from './topBarRoute';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [...authRoute, topBarRoute],
  },
]);

export default router;
