import { useState, useEffect } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Premium Cars at Competitive Prices",
      description:
        "Discover our wide selection of quality vehicles for every budget",
      buttonText: "Shop Now",
      buttonLink: "/all-products",
      image: "https://i.postimg.cc/C5jSRDWZ/11452734.png",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Special Spring Offers",
      description: "Get up to 15% off on select models this season",
      buttonText: "View Deals",
      buttonLink: "/all-products",
      image:
        "https://i.postimg.cc/2j4DFQKy/vecteezy-white-sport-car-on-transparent-background-3d-rendering-25305916.png",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Electric Vehicles",
      description: "Explore our eco-friendly options with zero emissions",
      buttonText: "Learn More",
      buttonLink: "/all-products",
      image:
        "https://i.postimg.cc/zGfYr9XH/vecteezy-a-luxury-car-on-a-transparent-background-53539020.png",
      bgColor: "bg-purple-100",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };

  return (
    <div className="relative overflow-hidden h-96 mb-12">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`flex-none w-full h-full ${banner.bgColor}`}
          >
            <div className="container mx-auto h-full flex items-center px-4">
              <div className="w-full md:w-1/2 pr-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {banner.title}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {banner.description}
                </p>
                <a
                  href={banner.buttonLink}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {banner.buttonText}
                </a>
              </div>
              <div className="hidden md:block w-1/2">
                <img src={banner.image} alt="Banner" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
