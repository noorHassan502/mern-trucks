import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './assets/components/Header';
import Home from './assets/pages/Home';
import SignIn from './assets/pages/SignIn';
import Signup from './assets/pages/Signup'; // ✅ FIXED casing here

import About from './assets/pages/About';
import Search from './assets/pages/Search';
import Listing from './assets/pages/Listing';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} /> {/* ✅ Uses corrected import */}
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
