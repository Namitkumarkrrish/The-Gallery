import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import OurGallery from './Pages/OurGallery/OurGallery';
import AddMemory from './Pages/AddMemory/AddMemory';
import Navbar from './components/Navbar/Navbar';
import './App.css';

/**
 * PrivateRoute Wrapper
 * Ensures Navbar is only visible when logged in and protects routes
 */
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Landing Page */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          {/* Protected Photo Gallery Page */}
          <Route path="/our-gallery" element={
            <PrivateRoute>
              <OurGallery />
            </PrivateRoute>
          } />

          {/* Protected Add Memory Page */}
          <Route path="/add" element={
            <PrivateRoute>
              <AddMemory />
            </PrivateRoute>
          } />

          {/* Redirect unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
