import React, { Fragment } from 'react';
import Chart from './components/Chart';
import RouterPage from './components/RouterPage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Storage from './Storage/Storage';

const isLoggedIn = Storage.get("token")

function App() {
  return (
    <body
    className={!isLoggedIn ? "load" : ""}
  >
      <RouterPage />
      <ToastContainer />
   </body>
  );
}

export default App;