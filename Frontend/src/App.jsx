import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DelayedLoad from './Components/DelayedLoad';
import Loading from './Components/Loading';

import { getme } from './redux/thunks/userThunks';

// Import pages
const Home = React.lazy(() => import('./Pages/Home.jsx'));
const About = React.lazy(() => import('./Pages/About.jsx'));
const Category = React.lazy(() => import('./Pages/Category.jsx'));
const Contact = React.lazy(() => import('./Pages/Contact.jsx'));
const CarDetail = React.lazy(() => import('./Pages/CarDetail.jsx'));
const Login = React.lazy(() => import('./Pages/Login.jsx'));
const Signup = React.lazy(() => import('./Pages/Signup.jsx'));
const OTPInput = React.lazy(() => import('./Pages/OTPInput.jsx'));
const Profile = React.lazy(() => import('./Pages/Profile.jsx'));
const Welcome = React.lazy(() => import('./Pages/Welcome')); // Corrected spelling
const Post = React.lazy(() => import('./Pages/Post.jsx'));
const ReadAdv = React.lazy(() => import('./Pages/ReadAdv.jsx'));
const EditAdv = React.lazy(() => import('./Pages/EditAdv.jsx'));
const SelectProfileImg = React.lazy(() => import('./Pages/SelectProflieImg.jsx')); // Corrected spelling

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getme())
        .catch(err => {
          // Handle error in fetching user data
          console.error('Failed to fetch user data:', err);
          toast.error('Failed to fetch user data.');
        });
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Home /></React.Suspense></DelayedLoad>} />
        <Route path='/about' element={<DelayedLoad><React.Suspense fallback={<Loading />}><About /></React.Suspense></DelayedLoad>} />
        <Route path='/category/:id' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Category /></React.Suspense></DelayedLoad>} />
        <Route path='/contact' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Contact /></React.Suspense></DelayedLoad>} />
        <Route path='/cardetail/:id' element={<DelayedLoad><React.Suspense fallback={<Loading />}><CarDetail /></React.Suspense></DelayedLoad>} />
        <Route path='/login' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Login /></React.Suspense></DelayedLoad>} />
        <Route path='/signup' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Signup /></React.Suspense></DelayedLoad>} />
        <Route path='/otpinput' element={<DelayedLoad><React.Suspense fallback={<Loading />}><OTPInput /></React.Suspense></DelayedLoad>} />
        <Route path='/profile' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Profile /></React.Suspense></DelayedLoad>} />
        <Route path='/welcome' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Welcome /></React.Suspense></DelayedLoad>} />
        <Route path='/post' element={<DelayedLoad><React.Suspense fallback={<Loading />}><Post /></React.Suspense></DelayedLoad>} />
        <Route path='/readadv' element={<DelayedLoad><React.Suspense fallback={<Loading />}><ReadAdv /></React.Suspense></DelayedLoad>} />
        <Route path='/editadv/:id' element={<DelayedLoad><React.Suspense fallback={<Loading />}><EditAdv /></React.Suspense></DelayedLoad>} />
        <Route path='/profileimg/:id' element={<DelayedLoad><React.Suspense fallback={<Loading />}><SelectProfileImg /></React.Suspense></DelayedLoad>} /> {/* Corrected spelling */}
      </Routes>
    </Router>
  );
}

export default App;
