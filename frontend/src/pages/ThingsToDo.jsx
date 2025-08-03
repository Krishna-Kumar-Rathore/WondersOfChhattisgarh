function ThingsToDo() {
  // Food items data
  const dishes = [
    { name: "Angakar Roti", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999569/AngakarRoti_pftxgq.jpg" },
    { name: "Faraa (Fara)", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999583/Faraa_v32itc.jpg" },
    { name: "Chila", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999580/chila_xf9vyn.jpg" },
    { name: "Aarisa (Anarsa)", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999570/Airsa_xmlnxj.jpg" },
    { name: "Thethri", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999637/Thethri_tva9ly.jpg" },
    { name: "Bore Baasi", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999572/BoreBaasi_bwbwqu.jpg" },
    { name: "Dubki Kadhi", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999582/DubkiKadhi_r0gkiu.jpg" },
    { name: "Bhajia", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999570/Bhajia_v9rx0t.jpg" },
    { name: "Gulgul Bhajiya", img: "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999585/GulgulBhajiya_anmdor.jpg" }
  ];

  // Festivals data
  const festivals = [
    {
      name: "Hareli Tihar",
      img: [
        // "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999641/Hareli3_zud6kx.png",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999636/Hareli2_orvy7j.png",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999612/Hareli1_hajfjm.png",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999609/Cherchera1_aj83cj.png",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999613/Hareli4_e5deqn.jpg"
      ],
      description: "Hareli is a traditional farming festival celebrated with deep cultural significance in Chhattisgarh. People worship agricultural tools and cows, and children enjoy traditional games like 'Gedi'."
    },
    {
      name: "Halshahthi",
      img: [
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999680/Halshahthi3_lz6xoh.jpg",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999667/Halshahthi2_kf5yek.jpg",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999655/Hareli5_h0ejbw.jpg",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999646/Halshahthi1_tznbn3.jpg"
      ],
      description: "Celebrated during the month of Bhadrapada, Halshahthi marks the beginning of the sowing season. Women observe fasts and worship Lord Krishna, offering freshly sown grains."
    },
    {
      name: "Cherchera",
      img: [
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999577/Cherchera2_gl1fhq.jpg",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999579/Cherchera3_v4upwc.jpg",
        "https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999641/Hareli3_zud6kx.png"
      ],
      description: "Cherchera is celebrated after the harvest, thanking nature for prosperity. Children go door to door, collecting grains and sweets while singing traditional songs."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Things To Do</h1>
          <p className="text-xl text-gray-600">
            Immerse yourself in the rich culture, delicious cuisine, and vibrant festivals of Chhattisgarh
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Cuisine Section */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-8 py-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Chhattisgarhi Cuisine</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience the authentic flavors of Chhattisgarh with its simple yet delicious traditional cuisine 
                  that reflects the agricultural richness of the region.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {dishes.map((dish, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={dish.img}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-center text-sm">
                        {dish.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-primary-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-800">Traditional Cooking Methods</h3>
                <p className="text-gray-700 leading-relaxed">
                  Chhattisgarhi cuisine is known for its use of locally grown ingredients like rice, lentils, and seasonal vegetables. 
                  Traditional cooking methods include clay pot cooking, steaming in banana leaves, and slow-cooking over wood fires, 
                  which enhance the natural flavors and nutritional value of the food.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Festivals Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-700 mb-4">
                Culture & Festivals
              </h1>
              <div className="h-[4px] w-24 bg-green-600 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the joy and colors of Chhattisgarh through its numerous festivals that celebrate 
                nature, harvest, and community spirit throughout the year.
              </p>
            </div>

            {festivals.map((festival, index) => (
              <div
                key={index}
                className={`flex flex-col-reverse lg:flex-row items-center gap-12 mb-20 ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                    {festival.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {festival.description}
                  </p>
                  <div className="mt-6">
                    <div className="inline-flex items-center space-x-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Traditional Festival</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {festival.img.map((imgSrc, i) => (
                      <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={imgSrc}
                          alt={`${festival.name} ${i + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                    {/* If there are only 2 images, create a spanning layout */}
                    {festival.img.length === 2 && (
                      <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                        {/* This ensures proper grid layout for 2 images */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rich Cultural Heritage Section */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Rich Cultural Heritage</h2>
                <p className="text-gray-600 mb-6">
                  Chhattisgarh is home to diverse tribal communities, each with their unique traditions, 
                  art forms, and way of life that has been preserved for centuries.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cultural Highlights:</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold">Tribal Art & Crafts</h4>
                    <p className="text-sm text-gray-600">
                      Intricate tribal paintings, bamboo crafts, and traditional pottery
                    </p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold">Folk Music & Dance</h4>
                    <p className="text-sm text-gray-600">
                      Raut Nacha, Panthi, and Karma dance forms with traditional music
                    </p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold">Traditional Attire</h4>
                    <p className="text-sm text-gray-600">
                      Colorful tribal costumes and handwoven textiles
                    </p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold">Ancient Temples</h4>
                    <p className="text-sm text-gray-600">
                      Beautiful stone carvings and architectural marvels
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://res.cloudinary.com/dcwgv3imm/image/upload/v1753999609/Cherchera1_aj83cj.png"
                  alt="Chhattisgarhi Culture"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Experience Authentic Chhattisgarh</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Plan your cultural journey and discover the heart of India's tribal heritage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/places"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Cultural Sites
              </a>
              <a
                href="/"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Featured Destinations
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ThingsToDo;