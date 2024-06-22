import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-5 text-6xl text-gray-500">Oops!</h1>
      <p className="mb-5">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status} {error.statusText || error.message}
        </i>
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go back to home
      </button>
    </div>
  );
}
