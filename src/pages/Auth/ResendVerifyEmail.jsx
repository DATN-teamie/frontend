import { useNavigate, useParams } from 'react-router-dom';
import AlertBar from '../../components/AlertBar';
import { useState } from 'react';
import resendVerifyEmail from '../../api/user/resendVerifyEmail';
import { sleep } from '../../helper/sleep';

export default function ResendVerifyEmail() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [isResendEmailLoading, setIsResendEmailLoading] = useState(false);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const resendVerifyEmailHandler = async () => {
    setIsResendEmailLoading(true);
    const response = await resendVerifyEmail({
      email,
    });
    console.log(response);
    if (response.status == 200) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Email already verified, please login',
      });
      setIsResendEmailLoading(false);
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });
      setIsResendEmailLoading(false);
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      type: 'success',
      message: 'Email verification has been sent',
    });
    setIsResendEmailLoading(false);
  };

  return (
    <div className="flex grow justify-center">
      <div className="flex flex-col p-10 shadow-xl">
        <h1 className="font-bold text-lg">Verify Email</h1>

        <p className="mt-5">
          we already have sent you email verification, if you do not receive
          email, please press Resend Verify Email Button
        </p>

        <button onClick={() => navigate('/login')} className="btn w-fit mt-5">
          return to login
        </button>

        {isResendEmailLoading ? (
          <span className="loading loading-spinner loading-md mt-5"></span>
        ) : (
          <button
            onClick={resendVerifyEmailHandler}
            className="btn btn-primary w-fit mt-5"
          >
            Resend Verify Email
          </button>
        )}
      </div>

      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
