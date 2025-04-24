import { Link } from "react-router-dom";
import { ICar } from "../types/types";

interface FeaturedProductsProps {
  products: ICar[];
  isLoading: boolean;
  onAddToCart: (car: ICar) => void;
}

const FeaturedProducts = ({
  products,
  isLoading,
  onAddToCart,
}: FeaturedProductsProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Vehicles
          </h2>
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
            <svg
              className="ml-2 w-5 h-5"
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
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((car) => (
              <div key={car._id} className="flex flex-col h-full">
                <Link
                  to={`/product-details/${car._id}`}
                  className="flex-grow block rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg bg-white"
                >
                  <div className="relative">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="h-48 w-full object-cover"
                    />
                    <span className="absolute top-0 right-0 m-3 px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {car.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {car.brand} {car.model}{" "}
                      <span className="text-gray-600">({car.year})</span>
                    </h3>

                    <p className="text-gray-600 line-clamp-2 mb-3">
                      {car.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          car.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.inStock
                          ? `In stock: ${car.quantity}`
                          : "Out of stock"}
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => onAddToCart(car)}
                  disabled={!car.inStock}
                  className={`mt-3 w-full px-4 py-3 rounded-lg font-semibold text-white transition-colors ${
                    car.inStock
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {car.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
