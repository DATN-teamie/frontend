export const baseurl = 'http://localhost';
export const apikey = '';
export const getSocketId = () => {
  try {
    if (window.Echo) {
      return window.Echo.socketId();
    }
    return '';
  } catch (e) {
    return '';
  }
};
