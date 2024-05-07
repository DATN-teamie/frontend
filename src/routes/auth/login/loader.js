import { redirect } from 'react-router-dom';
import verifyLoginApi from '../../../api/auth/verifyLogin.api';

export const loader = async () => {
  const responseVerifyLogin = await verifyLoginApi();
  if (responseVerifyLogin.ok) {
    return redirect('/homepage');
  }
  return 1;
};
