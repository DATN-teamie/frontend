import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmailSuccess() {
  const navigate = useNavigate();

  const { email } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex grow justify-center">
      <div className="flex flex-col  p-10  shadow-xl">
        <h1 className="font-bold text-green-500 text-lg">
          Email Verified Success
        </h1>
        <p className="mt-5">
          Your email has been verified. You will be redirected to the login page
          shortly.
        </p>
      </div>
    </div>
  );
}
