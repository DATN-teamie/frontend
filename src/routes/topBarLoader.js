import verifyLoginApi from '../api/auth/verifyLogin.api';
import getAuthUserApi from '../api/user/getAuthUser';
import { redirect } from 'react-router-dom';

export default async function () {
  const responseVerifyLogin = await verifyLoginApi();
  const userResponse = await getAuthUserApi();
  if (!responseVerifyLogin.ok) {
    return redirect('/login');
  }
  if (userResponse.ok) {
    const user = userResponse.data.user;
    return {user};
  }
  return 1;
}
