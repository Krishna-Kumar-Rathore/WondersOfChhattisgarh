import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { placesAPI } from "../services/api";
import PlaceCard from "../components/PlaceCard";
import { toast } from "react-toastify";

const Home = () => {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reels carousel state
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const reels = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761987554/Reel4_lpr4l1.mp4",
      title: "Natural Beauty",
      description: "Lush Forests"
      
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761985922/CG1_mbk8am.mp4",
      title: "Chhattisgarh",
      description: "The Land of Natural Beauty & Rich Culture"
      
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761987597/CG2_k0ebcf.mp4",
      title: "Ancient Temples",
      description: ""
      
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761987515/Reel6_toope7.mp4",
      title: "छत्तीसगढ़िया सबले बढ़िया🌾",
      description: ""
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761987049/Reel3_dr3mov.mp4",
      title: "Korba",
      description: ""
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761987590/Reel5_Food_yem1uu.mp4",
      title: "Chhattisgariya Cuisine",
      description: ""
    },
    {
      id: 7,
      url: "https://res.cloudinary.com/dcwgv3imm/video/upload/v1761986956/Reel7_tskrkl.mp4",
      title: "Hidden Gems",
      description: "Explore More"
    }
  ];

  useEffect(() => {
    fetchFeaturedPlaces();
  }, []);

  const fetchFeaturedPlaces = async () => {
    try {
      const response = await placesAPI.getFeatured();
      setFeaturedPlaces(response.data.places);
    } catch (error) {
      toast.error("Failed to fetch featured places");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to next reel
  const nextReel = () => {
    setCurrentReelIndex((prevIndex) => 
      prevIndex === reels.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  // Navigate to previous reel
  const prevReel = () => {
    setCurrentReelIndex((prevIndex) => 
      prevIndex === 0 ? reels.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextReel();
      if (e.key === 'ArrowLeft') prevReel();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentReelIndex, isPlaying]);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextReel();
    }
    if (touchStart - touchEnd < -75) {
      prevReel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="relative flex items-center justify-center bg-center bg-cover h-96 md:h-[500px]"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dcwgv3imm/image/upload/v1755714383/CGimg_2_gyixra.png')",
          }}
        >
          <div className="z-10 px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl animate-fade-in">
              Wonders of Chhattisgarh
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-lg md:text-2xl animate-fade-in-delay">
              Discover the hidden gems, ancient temples, lush forests, and
              vibrant culture of India's heart
            </p>
            <Link
              to="/places"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block px-8 py-3 font-semibold transition-all duration-300 transform bg-white rounded-lg shadow-lg text-primary-600 hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
            >
              Explore All Places
            </Link>
          </div>
        </div>
      </section>

      {/* Video Reels Section - Simplified */}
    <section className="py-20 bg-white">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Experience Chhattisgarh
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Discover the beauty and culture through immersive visual stories
        </p>
        </div>

        {/* Main Video Player */}
        <div className="relative max-w-5xl mx-auto">
        {/* Video Container */}
        <div
            className="relative overflow-hidden bg-black shadow-2xl rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main Video */}
            <div className="relative aspect-[9/16] lg:aspect-video">
            <video
                ref={videoRef}
                key={reels[currentReelIndex].id}
                className="object-contain w-full h-full bg-black"
                src={reels[currentReelIndex].url}
                loop
                playsInline
                onClick={togglePlayPause}
            >
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                <div className="flex-1">
                    <h3 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                    {reels[currentReelIndex].title}
                    </h3>
                    <p className="text-lg text-gray-200 md:text-xl">
                    {reels[currentReelIndex].description}
                    </p>
                </div>
                
                {/* Video Counter Badge */}
                <div className="flex items-center gap-2 px-4 py-2 ml-4 rounded-full bg-white/10 backdrop-blur-md">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="font-semibold text-white">
                    {currentReelIndex + 1}/{reels.length}
                    </span>
                </div>
                </div>
            </div>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                onClick={togglePlayPause}
                >
                <div className="transition-all duration-300 transform hover:scale-110">
                    <div className="flex items-center justify-center w-24 h-24 transition-all bg-white rounded-full shadow-2xl hover:bg-gray-50">
                    <svg className="w-12 h-12 ml-1 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    </div>
                </div>
                </div>
            )}

            {/* Navigation Arrows */}
            <button
                onClick={prevReel}
                className="absolute p-4 transition-all duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-xl left-4 top-1/2 hover:bg-gray-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Previous video"
            >
                <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextReel}
                className="absolute p-4 transition-all duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-xl right-4 top-1/2 hover:bg-gray-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Next video"
            >
                <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-8">
            {/* Progress Bar */}
            <div className="relative h-2 mb-6 overflow-hidden bg-gray-200 rounded-full">
            <div
                className="h-full transition-all duration-300 rounded-full bg-primary-600"
                style={{ width: `${((currentReelIndex + 1) / reels.length) * 100}%` }}
            ></div>
            </div>

            {/* Mobile Thumbnails - Horizontal Scroll */}
            <div className="mb-6 lg:hidden">
            <div className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide">
                {reels.map((reel, index) => (
                <button
                    key={reel.id}
                    onClick={() => {
                    setCurrentReelIndex(index);
                    setIsPlaying(false);
                    }}
                    className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentReelIndex
                        ? 'ring-4 ring-primary-600 scale-105'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                >
                    <div className="w-24 h-32 bg-gray-800">
                    <video
                        src={reel.url}
                        className="object-cover w-full h-full"
                        muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-xs font-semibold text-white">{index + 1}</span>
                    </div>
                    </div>
                </button>
                ))}
            </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
            <button
                onClick={togglePlayPause}
                className="flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-primary-600 hover:bg-primary-700 hover:scale-105"
            >
                {isPlaying ? (
                <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                    <span>Pause</span>
                </>
                ) : (
                <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Play</span>
                </>
                )}
            </button>

            {/* Desktop Navigation Hint */}
            <div className="hidden text-sm text-gray-600 md:block">
                <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                    <kbd className="px-3 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm">←</kbd>
                    <kbd className="px-3 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm">→</kbd>
                    <span>Navigate</span>
                </span>
                <span className="flex items-center gap-2">
                    <kbd className="px-3 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm">Space</kbd>
                    <span>Play/Pause</span>
                </span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

       {/* Why Choose Chhattisgarh Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Why Choose Chhattisgarh?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Natural Beauty</h3>
              <p className="text-gray-600">
                Pristine forests, stunning waterfalls, and diverse wildlife
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Rich Heritage</h3>
              <p className="text-gray-600">
                Ancient temples, historical monuments, and archaeological
                wonders
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Tribal Culture</h3>
              <p className="text-gray-600">
                Vibrant tribal traditions, folk arts, and authentic experiences
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Adventure</h3>
              <p className="text-gray-600">
                Trekking, wildlife safaris, river rafting, and cave exploration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Explore Chhattisgarh?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Start planning your journey through India's best-kept secret destination
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/places"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 font-semibold transition-all duration-300 transform bg-white rounded-lg shadow-lg text-primary-600 hover:bg-gray-100 hover:scale-105"
            >
              Browse All Places
            </Link>
            <Link
              to="/things-to-do"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-8 py-3 font-semibold text-white transition-all duration-300 transform bg-transparent border-2 border-white rounded-lg shadow-lg hover:bg-white hover:text-primary-600 hover:scale-105"
            >
              Things To Do
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;