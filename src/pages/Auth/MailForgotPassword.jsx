import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBar from '../../components/AlertBar';
import sendMailForgotPass from '../../api/user/sendMailForgotPass';

export default function MailForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [alertBar, setAlertBar] = useState({
    isALertVisible: false,
    message: '',
    type: 'success',
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendMailHandler = async () => {
    setIsLoading(true);
    const response = await sendMailForgotPass({ email });
    if (response.status == 422 || response.status == 401) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });
      setIsLoading(false);
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Something went wrong',
      });
      setIsLoading(false);
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      type: 'success',
      message: 'Email sent successfully, please check your email',
    });
    setIsLoading(false);
  };

  return (
    <div className="flex grow justify-center">
      <div className="flex flex-col shadow-xl p-10 mt-10">
        <h1 className="font-bold text-lg">Enter mail forgot password</h1>
        <p className="text-sm my-5">
          Enter your email address to reset your password
        </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="border p-2 input input-bordered mb-5"
        />
        <div className="flex flex-row-reverse">
          <button onClick={() => navigate('/login')} className="btn w-fit">
            Cancel
          </button>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <button
              onClick={sendMailHandler}
              className="btn btn-primary w-fit mr-5"
            >
              Send Email Reset Password
            </button>
          )}
        </div>
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
