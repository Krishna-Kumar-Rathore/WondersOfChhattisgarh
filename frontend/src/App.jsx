import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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