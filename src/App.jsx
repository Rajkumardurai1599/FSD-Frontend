import { Button } from 'flowbite-react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashboard from './Pages/Dashboard';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Header from './Components/Header';
import Blogs from './Pages/Blogs';
import FooterCom from './Components/Footer';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/blogs' element = {<Blogs />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  );
};

export default App;