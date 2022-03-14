import React, { Fragment } from 'react';
import Chart from './components/Chart';
import RouterPage from './components/RouterPage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Fragment>
      <RouterPage />
    </Fragment>
  );
}

export default App;