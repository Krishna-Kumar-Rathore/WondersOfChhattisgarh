import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Analytics
import { initGA, trackPageView } from './utils/analytics';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import BeInspired from './pages/BeInspired';
import PlacesToGo from './pages/PlacesToGo';
import ThingsToDo from './pages/ThingsToDo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import PlaceDetails from './pages/PlaceDetails';
import Admin from './pages/Admin';

// Analytics Component
function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    trackPageView(window.location.href, document.title);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Analytics />
        <Navbar />
        
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<BeInspired />} />
            <Route path="/places" element={<PlacesToGo />} />
            <Route path="/things-to-do" element={<ThingsToDo />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;