import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './containers/navbar';
import AppRouter from './containers/app-router';
import AppLoader from './components/shared/app-loader';

function App({ loading }) {
  return (
    <AppLoader loading={loading}>
      <ToastContainer />
      <Navbar />
      <AppRouter />
    </AppLoader>
  );
}

export default App;
