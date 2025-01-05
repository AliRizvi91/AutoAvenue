import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this imports your custom CSS with the font size changes
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App';

//-------- Bootstrap--------
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'



//-------- React-Toastify--------
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </Provider>
  </React.StrictMode>
);
