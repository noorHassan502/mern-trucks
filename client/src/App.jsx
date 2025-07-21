import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './assets/components/Header';
import Home from './assets/pages/Home';
import SignIn from './assets/pages/SignIn';
import Signout from './assets/pages/Signout';

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
        <Route path="/sign-out" element={<Signout />} />
         <Route path="/about" element={<About />} />
           <Route path="/search" element={<Search />} />
           <Route path="/listing/:listingId" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
