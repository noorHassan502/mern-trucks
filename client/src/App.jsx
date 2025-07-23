import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './assets/components/Header';
import Home from './assets/pages/Home';
import SignIn from './assets/pages/SignIn';
import Signup from './assets/pages/Signup';
import About from './assets/pages/About';
import Search from './assets/pages/Search';
import Listing from './assets/pages/Listing';
import Profile from './assets/pages/Profile'; // ✅ New import
import PrivateRoute from './assets/components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}></Route>
        <Route path="/profile" element={<Profile />} /> {/* ✅ New route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
