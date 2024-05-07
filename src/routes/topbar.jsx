import verifyLogin from '../api/auth/verifyLogin.api';
import TopBar from '../pages/TopBar';

async function topBarLoader() {
  const response = await verifyLogin();
  console.log(response);
  return response;

}

export default {
  path: '/homepage',
  element: <TopBar />,
  loader: topBarLoader,
};
