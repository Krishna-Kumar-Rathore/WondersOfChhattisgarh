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
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Things To Do</h1>
          <p className="text-xl text-gray-600">
            Immerse yourself in the rich culture, delicious cuisine, and vibrant festivals of Chhattisgarh
          </p>
        </div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Cuisine Section */}
        <section className="mb-20">
          <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
            <div className="px-8 py-12">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Chhattisgarhi Cuisine</h2>
                <p className="max-w-3xl mx-auto text-xl text-gray-600">
                  Experience the authentic flavors of Chhattisgarh with its simple yet delicious traditional cuisine 
                  that reflects the agricultural richness of the region.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {dishes.map((dish, index) => (
                  <div 
                    key={index}
                    className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md group rounded-xl hover:shadow-xl"
                  >
                    <div className="overflow-hidden aspect-square">
                      <img
                        src={dish.img}
                        alt={dish.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-center text-gray-900">
                        {dish.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 mt-12 bg-primary-50 rounded-xl">
                <h3 className="mb-4 text-xl font-semibold text-primary-800">Traditional Cooking Methods</h3>
                <p className="leading-relaxed text-gray-700">
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
          <div className="px-4 mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-3xl font-extrabold text-green-700 md:text-4xl lg:text-5xl">
                Culture & Festivals
              </h1>
              <div className="h-[4px] w-24 bg-green-600 mx-auto mb-8 rounded-full"></div>
              <p className="max-w-3xl mx-auto text-xl text-gray-600">
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
                  <h2 className="mb-4 text-2xl font-bold text-green-800 md:text-3xl">
                    {festival.name}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {festival.img.map((imgSrc, i) => (
                      <div key={i} className="relative overflow-hidden shadow-lg group rounded-xl">
                        <img
                          src={imgSrc}
                          alt={`${festival.name} ${i + 1}`}
                          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
                      </div>
                    ))}
                    {/* If there are only 2 images, create a spanning layout */}
                    {festival.img.length === 2 && (
                      <div className="grid grid-cols-2 gap-4 sm:col-span-2">
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
          <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
            <div className="md:flex">
              <div className="p-8 md:w-1/2">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Rich Cultural Heritage</h2>
                <p className="mb-6 text-gray-600">
                  Chhattisgarh is home to diverse tribal communities, each with their unique traditions, 
                  art forms, and way of life that has been preserved for centuries.
                </p>
                
                <h3 className="mb-3 text-xl font-semibold">Cultural Highlights:</h3>
                <div className="space-y-4">
                  <div className="pl-4 border-l-4 border-primary-500">
                    <h4 className="font-semibold">Tribal Art & Crafts</h4>
                    <p className="text-sm text-gray-600">
                      Intricate tribal paintings, bamboo crafts, and traditional pottery
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-primary-500">
                    <h4 className="font-semibold">Folk Music & Dance</h4>
                    <p className="text-sm text-gray-600">
                      Raut Nacha, Panthi, and Karma dance forms with traditional music
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-primary-500">
                    <h4 className="font-semibold">Traditional Attire</h4>
                    <p className="text-sm text-gray-600">
                      Colorful tribal costumes and handwoven textiles
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-primary-500">
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
                  className="object-cover w-full h-64 md:h-full"
                />
              </div>
            </div>
          </div>
        </section>

        

        {/* Call to Action */}
        {/* <section className="text-center">
          <div className="p-12 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl">
            <h2 className="mb-4 text-3xl font-bold">Experience Authentic Chhattisgarh</h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl">
              Plan your cultural journey and discover the heart of India's tribal heritage
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/places"
                className="px-8 py-3 font-semibold transition-colors bg-white rounded-lg text-primary-600 hover:bg-gray-100"
              >
                Explore Cultural Sites
              </a>
              <a
                href="/"
                className="px-8 py-3 font-semibold text-white transition-colors bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-primary-600"
              >
                Featured Destinations
              </a>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default ThingsToDo;