import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProjectsPage from './ProjectsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-dark text-brand-light">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
