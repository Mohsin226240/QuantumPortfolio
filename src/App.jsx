import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LandingPage  from './pages/LandingPage';
import  ProjectsPage  from './components/ProjectPage';
import { ThemeProvider } from './components/ThemeContext';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}