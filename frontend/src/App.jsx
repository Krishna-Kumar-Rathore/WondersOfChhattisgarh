import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Analytics
import { initGA, trackPageView } from './utils/analytics';

// SEO Component
import SEO from './components/SEO';
import { seoConfig } from './utils/seoConfig';

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

// SEO Route Component
function SEORoutes() {
  const location = useLocation();
  
  // Determine SEO config based on current route
  const getSEOConfig = () => {
    const path = location.pathname;
    
    if (path === '/') return seoConfig.home;
    if (path === '/places') return seoConfig.places;
    if (path === '/things-to-do') return seoConfig.thingsToDo;
    if (path === '/login') return seoConfig.login;
    if (path === '/signup') return seoConfig.signup;
    if (path === '/wishlist') return seoConfig.wishlist;
    if (path.startsWith('/place/')) {
      // For place details, we'll need to get place data
      // This is a placeholder - you should get actual place data
      return seoConfig.placeDetail("Tourist Place", "City");
    }
    
    return seoConfig.home; // Default
  };

  const currentSEO = getSEOConfig();

  return <SEO {...currentSEO} />;
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Add structured data for the website
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Wonder of Chhattisgarh",
      "url": "https://wonders-of-chhattisgarh.vercel.app/",
      "description": "Discover the natural beauty, rich culture, and heritage of Chhattisgarh",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://wonders-of-chhattisgarh.vercel.app/places?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Analytics />
        <SEORoutes />
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