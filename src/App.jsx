
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
