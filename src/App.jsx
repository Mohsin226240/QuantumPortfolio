import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LandingPage  from './pages/LandingPage';
import  ProjectsPage  from './components/ProjectPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}