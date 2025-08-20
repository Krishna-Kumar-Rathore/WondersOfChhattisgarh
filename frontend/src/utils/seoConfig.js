// src/utils/seoConfig.js
export const seoConfig = {
  home: {
    title: "Wonder of Chhattisgarh - Best Tourist Places, Culture & Heritage",
    description: "Explore the incredible beauty of Chhattisgarh! Discover top tourist destinations, waterfalls like Chitrakote, temples, wildlife sanctuaries, tribal culture, and plan your perfect Chhattisgarh trip.",
    keywords: "Chhattisgarh tourism, Chhattisgarh tourist places, Chitrakote Falls, Bastar tourism, Raipur, Jagdalpur, Chhattisgarh waterfalls, tribal culture, India travel",
    url: "https://wonders-of-chhattisgarh.vercel.app/"
  },
  
  places: {
    title: "Top Tourist Places in Chhattisgarh - City Wise Travel Guide",
    description: "Discover amazing tourist places in Chhattisgarh by cities. Explore Raipur, Bilaspur, Jagdalpur, Korba, and more. Find waterfalls, temples, wildlife sanctuaries and cultural sites.",
    keywords: "Chhattisgarh tourist places, Raipur tourist places, Jagdalpur attractions, Bilaspur tourism, Korba places, Chhattisgarh cities, travel destinations",
    url: "https://wonders-of-chhattisgarh.vercel.app/places"
  },
  
  thingsToDo: {
    title: "Things to Do in Chhattisgarh - Culture, Food, Festivals & Activities",
    description: "Experience Chhattisgarh's rich culture, delicious cuisine, colorful festivals, and exciting activities. Learn about tribal traditions, local food, dance forms, and cultural events.",
    keywords: "Chhattisgarh culture, Chhattisgarh festivals, Chhattisgarh food, tribal culture, Bastar art, Chhattisgarh dance, local cuisine, cultural activities",
    url: "https://wonders-of-chhattisgarh.vercel.app/things-to-do"
  },
  
  placeDetail: (placeName, city) => ({
    title: `${placeName}, ${city} - Tourist Guide, Photos & Reviews | Chhattisgarh`,
    description: `Complete guide to ${placeName} in ${city}, Chhattisgarh. Find photos, reviews, best time to visit, how to reach, and nearby attractions. Plan your trip to ${placeName}.`,
    keywords: `${placeName}, ${city} tourism, ${placeName} photos, ${city} tourist places, Chhattisgarh attractions, ${placeName} reviews`,
    url: `https://wonders-of-chhattisgarh.vercel.app/place/`
  }),
  
  login: {
    title: "Login - Wonder of Chhattisgarh | Access Your Travel Wishlist",
    description: "Login to your Wonder of Chhattisgarh account to access your travel wishlist, save favorite places, and manage your Chhattisgarh trip planning.",
    keywords: "login, user account, travel wishlist, trip planning, Chhattisgarh travel",
    url: "https://wonders-of-chhattisgarh.vercel.app/login"
  },
  
  signup: {
    title: "Sign Up - Wonder of Chhattisgarh | Start Your Travel Journey",
    description: "Create your free account to save favorite Chhattisgarh destinations, create wishlists, write reviews, and plan your perfect trip to Chhattisgarh.",
    keywords: "signup, register, free account, travel planning, Chhattisgarh trip, wishlist",
    url: "https://wonders-of-chhattisgarh.vercel.app/signup"
  },
  
  wishlist: {
    title: "My Travel Wishlist - Saved Chhattisgarh Destinations",
    description: "Your saved Chhattisgarh destinations and travel wishlist. Keep track of places you want to visit and plan your perfect Chhattisgarh adventure.",
    keywords: "travel wishlist, saved places, Chhattisgarh destinations, trip planning, favorite places",
    url: "https://wonders-of-chhattisgarh.vercel.app/wishlist"
  }
};

// City-specific SEO data
export const cityKeywords = {
  raipur: "Raipur tourist places, Raipur attractions, capital of Chhattisgarh",
  bilaspur: "Bilaspur tourism, Bilaspur places to visit, Bilaspur attractions",
  jagdalpur: "Jagdalpur tourist places, Bastar tourism, tribal culture",
  korba: "Korba tourism, Korba attractions, industrial city Chhattisgarh",
  durg: "Durg tourist places, Durg Bhilai, steel city attractions",
  ambikapur: "Ambikapur tourism, Surguja district, forest areas"
};

// Place category keywords
export const categoryKeywords = {
  waterfall: "Chhattisgarh waterfalls, Chitrakote Falls, Tirathgarh Falls",
  temple: "Chhattisgarh temples, religious places, Hindu temples",
  wildlife: "Chhattisgarh wildlife sanctuaries, national parks, wildlife tourism",
  cultural: "Chhattisgarh culture, tribal culture, Bastar art, handicrafts",
  historical: "Chhattisgarh history, historical places, ancient monuments"
};