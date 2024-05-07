import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import auth from './auth';
import topbar from './topbar';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [...auth, topbar],
  },
]);

export default router;
