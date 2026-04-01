
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import BMS from './pages/BMS';
import EmbeddedSystems from './pages/EmbeddedSystems';
import DataScience from './pages/DataScience';
import CCTV from './pages/CCTV';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/industrial-automation" element={<CourseDetail />} />
          <Route path="courses/building-management-systems" element={<BMS />} />
          <Route path="courses/embedded-systems" element={<EmbeddedSystems />} />
          <Route path="courses/data-science" element={<DataScience />} />
          <Route path="courses/cctv" element={<CCTV />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
