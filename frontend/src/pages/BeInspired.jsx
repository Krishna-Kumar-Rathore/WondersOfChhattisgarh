import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { placesAPI } from "../services/api";
import PlaceCard from "../components/PlaceCard";
import { toast } from "react-toastify";

function BeInspired() {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 border-b-4 border-blue-600 rounded-full animate-spin"></div>
          <p className="max-w-md mt-6 text-gray-600">
            Initially, it takes around 50 seconds to fetch the data from the
            server. Please wait to experience the magic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="relative flex items-center justify-center bg-center bg-cover h-96"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dcwgv3imm/image/upload/v1755714383/CGimg_2_gyixra.png')",
          }}
        >
          <div className="z-10 text-center">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              Wonders of Chhattisgarh
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl md:text-2xl">
              Discover the hidden gems, ancient temples, lush forests, and
              vibrant culture of India's heart
            </p>
            <Link
              to="/places"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block px-8 py-3 font-semibold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
            >
              Explore All Places
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-center gap-5 mt-8 md:gap-9">
          <p className="text-3xl font-bold text-center text-blue-900 md:text-6xl">
            10 Chhattisgarh Destinations You Simply Can't Miss
          </p>
          <p className="px-4 mx-auto text-lg font-medium text-gray-700 md:text-2xl max-w-7xl ">
            `As a first-time visitor to Chhattisgarh, you'll be tempted to
            explore everything – from its vibrant tribal culture and ancient
            temples to majestic waterfalls and lush forests. If you’re looking
            to plan your journey, here’s our list of the 10 most iconic places
            in Chhattisgarh. `
          </p>
          {/* <span className="text-sm md:text-base text-gray-500 italic mt-[-15px] mx-auto">
           — By Krishna Kumar Rathore
         </span> */}

          {/* <div>
            <Cards/>
          </div> */}
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Featured Destinations
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Hand-picked destinations that showcase the best of Chhattisgarh's
              natural beauty, rich heritage, and cultural diversity
            </p>
          </div>

          {featuredPlaces.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="mb-4 text-2xl font-semibold text-gray-700">
                No Featured Places Yet
              </h3>
              <p className="mb-6 text-gray-600">
                Our team is curating the best destinations for you. Check back
                soon!
              </p>
              <Link
                to="/places"
                className="px-6 py-3 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                Browse All Places
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPlaces.map((place) => (
                <PlaceCard key={place._id} place={place} />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-5xl px-6 py-10 mx-auto shadow-md md:max-w-7xl bg-white/80 rounded-xl">
        <p className="text-lg font-medium leading-relaxed text-gray-800 md:text-xl">
          Chhattisgarh, often called the{" "}
          <span className="italic font-semibold text-green-700">
            "Rice Bowl of India,"
          </span>{" "}
          is a land of stunning natural beauty, ancient heritage, and rich
          tribal traditions. Due to its abundant paddy fields and agricultural
          prominence, the state is also home to majestic waterfalls like{" "}
          <span className="font-semibold text-blue-800">
            <a
              href="https://en.wikipedia.org/wiki/Chitrakote_Falls"
              target="blank"
            >
              {" "}
              Chitrakote
            </a>
          </span>
          , historic temples like{" "}
          <span className="font-semibold text-blue-800">
            <a
              href="https://en.wikipedia.org/wiki/Bhoramdeo_Temple"
              target="blank"
              rel="noopener noreferrer"
            >
              Bhoramdeo
            </a>
          </span>
          , and dense wildlife sanctuaries. With its vibrant festivals,
          spiritual landmarks, and unexplored landscapes, Chhattisgarh offers an
          authentic and unforgettable travel experience.
        </p>
      </div>


      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Link
            to="/places"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block px-8 py-3 font-semibold transition-colors rounded-lg text-primary-600 hover:bg-gray-300"
          >
            Explore All Places
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      {/* <section className="py-16 text-white bg-primary-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Explore Chhattisgarh?
          </h2>
          <p className="mb-8 text-xl">
            Start planning your journey through India's best-kept secret destination
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/places"
              className="px-8 py-3 font-semibold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
            >
              Browse All Places
            </Link>
            <Link
              to="/things-to-do"
              className="px-8 py-3 font-semibold text-white transition-colors bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-primary-600"
            >
              Things To Do
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default BeInspired;
