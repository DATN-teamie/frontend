import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmailFailed() {
  const navigate = useNavigate();

  const { email } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/resend-verify-email/${email}`);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, email]);

  return (
    <div className="flex grow justify-center">
      <div className="flex flex-col p-10 shadow-xl">
        <h1 className="font-bold text-red-500 text-lg">
          Email Verified Failed
        </h1>
        <p className='mt-5'>
          Your email has not been verified. You will be redirected to the resend
          verify email page
        </p>
      </div>
    </div>
  );
}
