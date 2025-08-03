const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Place = require('./models/Place');
const Review = require('./models/Review');

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@chhattisgarh.com',
    password: 'admin123',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'user@example.com',
    password: 'user123',
    isAdmin: false
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    isAdmin: false
  }
];

const samplePlaces = [
  {
    name: 'Chitrakote Falls',
    description: 'Known as the "Niagara of India", Chitrakote Falls is the largest waterfall in Chhattisgarh and one of the widest waterfalls in India. Located on the Indravati River, this horseshoe-shaped waterfall is about 95 feet high and 985 feet wide during monsoon.',
    city: 'Bastar',
    category: 'Natural',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true
  },
  {
    name: 'Kanker Palace',
    description: 'The magnificent Kanker Palace is a stunning example of royal architecture in Chhattisgarh. Built by the former rulers of Kanker, this palace showcases the rich heritage and cultural legacy of the region with its intricate designs and historical significance.',
    city: 'Kanker',
    category: 'Historic',
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true
  },
  {
    name: 'Tirathgarh Falls',
    description: 'A magnificent waterfall located in the Kanger Valley National Park, Tirathgarh Falls cascades down from a height of 300 feet in multiple tiers. The surrounding dense forest and the sound of falling water create a mesmerizing natural experience.',
    city: 'Jagdalpur',
    category: 'Natural',
    images: [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false
  },
  {
    name: 'Bhoramdeo Temple',
    description: 'Often called the "Khajuraho of Chhattisgarh", Bhoramdeo Temple is an 11th-century temple complex dedicated to Lord Shiva. The temple is famous for its erotic sculptures and intricate stone carvings that showcase the artistic excellence of ancient craftsmen.',
    city: 'Kawardha',
    category: 'Religious',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: true
  },
  {
    name: 'Kanger Valley National Park',
    description: 'One of the most beautiful and dense national parks in India, Kanger Valley is home to diverse flora and fauna. The park features underground caves, waterfalls, and is famous for its unique biodiversity including the rare mouse deer and hill myna.',
    city: 'Jagdalpur',
    category: 'Adventure',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false
  },
  {
    name: 'Rajim',
    description: 'Known as the "Prayag of Chhattisgarh", Rajim is a sacred town where three rivers meet. The ancient Rajiv Lochan Temple dedicated to Lord Vishnu is the main attraction, along with several other temples that make it an important pilgrimage destination.',
    city: 'Rajim',
    category: 'Religious',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wonder-chhattisgarh');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Place.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log('Sample users created');

    // Insert sample places
    const places = await Place.insertMany(samplePlaces);
    console.log('Sample places created');

    // Create sample reviews
    const sampleReviews = [
      {
        user: users[1]._id, // John Doe
        place: places[0]._id, // Chitrakote Falls
        rating: 5,
        comment: 'Absolutely breathtaking! The waterfall is magnificent, especially during monsoon. A must-visit destination in Chhattisgarh.'
      },
      {
        user: users[2]._id, // Jane Smith
        place: places[0]._id, // Chitrakote Falls
        rating: 4,
        comment: 'Beautiful place but can get very crowded during peak season. Best to visit early morning for better experience.'
      },
      {
        user: users[1]._id, // John Doe
        place: places[3]._id, // Bhoramdeo Temple
        rating: 5,
        comment: 'The architectural beauty and intricate carvings are amazing. Rich cultural heritage and peaceful environment.'
      }
    ];

    const reviews = await Review.insertMany(sampleReviews);
    console.log('Sample reviews created');

    // Update place ratings
    for (const place of places) {
      const placeReviews = reviews.filter(review => review.place.toString() === place._id.toString());
      if (placeReviews.length > 0) {
        const totalRating = placeReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / placeReviews.length;
        
        await Place.findByIdAndUpdate(place._id, {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: placeReviews.length
        });
      }
    }
    console.log('Updated place ratings');

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Demo Accounts:');
    console.log('Admin: admin@chhattisgarh.com / admin123');
    console.log('User: user@example.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();