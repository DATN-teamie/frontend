import { useEffect } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { VscError } from 'react-icons/vsc';

export default function AlertBar({ alertBar, setAlertBar }) {
  useEffect(() => {
    if (alertBar.isAlertVisible) {
      setTimeout(() => {
        setAlertBar({
          isAlertVisible: false,
          type: 'success',
          message: '',
        });
      }, 1200);
    }
  }, [alertBar.isAlertVisible, setAlertBar]);

  if (!alertBar.isAlertVisible) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`alert ${
        alertBar.type === 'success'
          ? 'alert-success bg-green-300'
          : 'alert-error bg-red-300'
      } fixed bottom-10 right-10 w-80`}
    >
      {alertBar.type === 'success' ? (
        <FaRegCheckCircle className=" size-6" />
      ) : (
        <VscError className="size-6" />
      )}
      <span>{alertBar.message}</span>
    </div>
  );
}
