import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Random from './pages/Random';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/random' element={<Random />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/category/:categoryName/:listingId' element={<Listing />} />
      </Routes>
      <Navbar />
    </Router>
    <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </>
  );
}

export default App;
