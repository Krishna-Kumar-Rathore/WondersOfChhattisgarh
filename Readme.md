# Wonder of Chhattisgarh 🌿

A modern MERN stack tourism website showcasing the natural beauty, rich culture, and heritage of Chhattisgarh, India.



```
Admin: admin@chhattisgarh.com / admin123
User:  user@example.com / user123
```

## 🚀 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose  
**Deployment:** Vercel (Frontend) + Render (Backend)

## 📁 Project Structure

```
wonder-of-chhattisgarh/
├── 📁 frontend/                    # React Frontend (Vercel)
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable UI components
│   │   │   ├── 🧩 Navbar.jsx     # Navigation bar
│   │   │   ├── 🧩 Footer.jsx     # Footer component
│   │   │   ├── 🧩 PlaceCard.jsx  # Place display card
│   │   │   └── 🧩 ReviewCard.jsx # Review component
│   │   ├── 📁 pages/              # Main page components
│   │   │   ├── 🏠 BeInspired.jsx  # Homepage with featured places
│   │   │   ├── 📍 PlacesToGo.jsx  # All places (city-wise)
│   │   │   ├── 🎭 ThingsToDo.jsx   # Culture, cuisine, festivals
│   │   │   ├── 🔐 Login.jsx       # User authentication
│   │   │   ├── 📝 Signup.jsx      # User registration
│   │   │   ├── ❤️ Wishlist.jsx    # User's saved places
│   │   │   ├── 📄 PlaceDetails.jsx# Individual place page
│   │   │   └── ⚙️ Admin.jsx       # Admin management panel
│   │   ├── 📁 services/
│   │   │   └── 🔗 api.js          # API service layer
│   │   ├── 🎨 App.jsx             # Main app component
│   │   ├── 🚀 main.jsx            # App entry point
│   │   └── 💅 index.css           # Global styles
│   ├── ⚙️ vite.config.js         # Vite configuration
│   ├── 🎨 tailwind.config.js     # Tailwind CSS config
│   └── 📋 package.json           # Dependencies & scripts
├── 📁 backend/                     # Express Backend (Render)
│   ├── 📁 models/                 # MongoDB schemas
│   │   ├── 👤 User.js            # User model (auth, wishlist)
│   │   ├── 📍 Place.js           # Tourist places model
│   │   └── ⭐ Review.js          # Reviews & ratings model
│   ├── 📁 routes/                 # API endpoints
│   │   ├── 🔐 auth.js            # Authentication routes
│   │   ├── 📍 places.js          # Places CRUD operations
│   │   ├── ⭐ reviews.js         # Reviews management
│   │   └── ⚙️ admin.js           # Admin panel routes
│   ├── 📁 middleware/
│   │   └── 🛡️ auth.js            # Authentication middleware
│   ├── 🌐 server.js              # Express server setup
│   ├── 🌱 seedData.js            # Sample data seeder
│   └── 📋 package.json           # Dependencies & scripts
└── 📖 README.md                   # Project documentation
```

## 🎯 Key Features

- **🏠 Be Inspired** - Featured destinations curated by admin
- **📍 Places To Go** - City-wise tourist spots with search & filters
- **🎭 Things To Do** - Culture, cuisine, festivals with videos
- **🔐 User Auth** - Login/signup with wishlist functionality
- **⭐ Reviews** - User ratings and reviews for places
- **⚙️ Admin Panel** - Add, edit, delete places with image management
- **📱 Responsive** - Mobile-first design with Tailwind CSS

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/wonder-of-chhattisgarh.git
cd wonder-of-chhattisgarh

# Backend setup
cd backend
npm install
cp .env.example .env  # Add your MongoDB URI
npm run dev          # Starts on port 5000

# Frontend setup (new terminal)
cd ../frontend
npm install
cp .env.example .env  # Add your API URL
npm run dev          # Starts on port 3000
```

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=Wonder of Chhattisgarh
```

## 📊 Database Schema

```
📊 MongoDB Collections:
├── 👥 users          # User accounts & wishlists
├── 🏛️ places         # Tourist destinations
└── ⭐ reviews        # User reviews & ratings
```

## 🎨 Design Highlights

- **🌿 Green Theme** - Nature-inspired color palette
- **🗺️ Google Maps** - Clickable city location integration  
- **🖼️ Image Gallery** - Multiple photos with carousel navigation
- **📱 Mobile First** - Responsive across all devices
- **⚡ Fast Loading** - Optimized for performance

## 📱 API Endpoints

```
🔐 Auth:     POST /api/auth/login, /signup
📍 Places:   GET /api/places/featured, /all, /search
⭐ Reviews:  GET /api/reviews/:placeId
❤️ Wishlist: POST /api/auth/wishlist/add
⚙️ Admin:    GET /api/admin/stats
```

## 🏗️ Architecture Flow

```
🌐 User Request → 📱 Vercel (Frontend) → 🔗 API Call → 🖥️ Render (Backend) → 🗄️ MongoDB Atlas
```

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own learning!

## 📄 License

MIT License - Feel free to use for educational purposes.

---

**Built with ❤️ to showcase Chhattisgarh's natural beauty and MERN stack development skills**