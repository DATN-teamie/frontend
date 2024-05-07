import verifyLoginApi from '../api/auth/verifyLogin.api';
import TopBar from '../pages/TopBar';
import { redirect } from 'react-router-dom';

async function topBarLoader() {
  const responseVerifyLogin = await verifyLoginApi();
  if (!responseVerifyLogin.ok) {
    return redirect('/login');
  }
  return 1;

}

export default {
  path: '/homepage',
  element: <TopBar />,
  loader: topBarLoader,
};
