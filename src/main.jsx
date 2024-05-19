import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import indexRoute from './routes/indexRoute';
import './index.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { apikey } from './api/constant.api';

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '14988d539eb4cc639bd9',
  cluster: 'ap1',
  forceTLS: true,
  // authEndpoint: 'http://localhost/broadcasting/auth',
  // authorizer: (channel, options) => {
  //   return {
  //     authorize: (socketId, callback) => {
  //       fetch(' http://localhost/broadcasting/auth', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           accept: 'application/json',
  //           apikey: apikey,
  //         },
  //       })
  //         .then((response) => {
  //           callback(null, response.data);
  //         })
  //         .catch((error) => {
  //           callback(error);
  //         });
  //     },
  //   };
  // },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={indexRoute} />
  </React.StrictMode>
);
