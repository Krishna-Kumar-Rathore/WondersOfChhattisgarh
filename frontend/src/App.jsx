import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Analytics
import { initGA, trackPageView } from "./utils/analytics";

// SEO Component
import SEO from "./components/SEO";
import { seoConfig } from "./utils/seoConfig";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import BeInspired from "./pages/BeInspired";
import PlacesToGo from "./pages/PlacesToGo";
import ThingsToDo from "./pages/ThingsToDo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import PlaceDetails from "./pages/PlaceDetails";
import Admin from "./pages/Admin";
import AuthSuccess from "./pages/AuthSuccess";
import AuthError from "./pages/AuthError";

// Get Google Client ID from environment
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Debug: Log the client ID (remove this after debugging)
console.log("🔍 GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID);
console.log("🔍 All env vars:", import.meta.env);

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

    if (path === "/") return seoConfig.home;
    if (path === "/places") return seoConfig.places;
    if (path === "/things-to-do") return seoConfig.thingsToDo;
    if (path === "/login") return seoConfig.login;
    if (path === "/signup") return seoConfig.signup;
    if (path === "/wishlist") return seoConfig.wishlist;
    if (path.startsWith("/place/")) {
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
      name: "Wonder of Chhattisgarh",
      url: "https://wonders-of-chhattisgarh.vercel.app/",
      description:
        "Discover the natural beauty, rich culture, and heritage of Chhattisgarh",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://wonders-of-chhattisgarh.vercel.app/places?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Debug: Log when App renders
  console.log("🚀 App component rendering with Client ID:", GOOGLE_CLIENT_ID);

  // Show error if Google Client ID is missing
  if (!GOOGLE_CLIENT_ID) {
    console.error('❌ Missing VITE_GOOGLE_CLIENT_ID environment variable');
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-8 text-center bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-red-600">⚠️ Configuration Error</h1>
          <p className="mb-2 text-gray-700">
            Google OAuth Client ID is missing.
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Please add <code className="px-2 py-1 bg-gray-100 rounded">VITE_GOOGLE_CLIENT_ID</code> to your <code className="px-2 py-1 bg-gray-100 rounded">.env</code> file
          </p>
          <div className="p-4 text-sm text-left bg-gray-100 rounded">
            <p className="font-semibold">Create .env file with:</p>
            <code>VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route path="/auth/error" element={<AuthError />} />
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
    </GoogleOAuthProvider>
  );
}

export default App;