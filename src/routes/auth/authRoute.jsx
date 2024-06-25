import Login from '../../pages/Auth/Login';
import ResendVerifyEmail from '../../pages/Auth/ResendVerifyEmail';
import Signup from '../../pages/Auth/Signup';
import VerifyEmailFailed from '../../pages/Auth/VerifyEmailFailed';
import VerifyEmailSuccess from '../../pages/Auth/VerifyEmailSuccess';
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
    loader: loginLoader,
  },
  {
    path: '/verify-email-success/:email',
    element: <VerifyEmailSuccess />,
  },
  {
    path: '/verify-email-failed/:email',
    element: <VerifyEmailFailed />,
  },
  {
    path: '/resend-verify-email/:email',
    element: <ResendVerifyEmail />,
  },
];
