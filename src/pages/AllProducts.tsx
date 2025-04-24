import { useState } from "react";
import { useGetCarsQuery } from "../redux/features/auth/carApi";
import { ICar } from "../types/types";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const limit = 8;
  const { data, isLoading, isError, error } = useGetCarsQuery({ page, limit });
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.data.totalPages && page < data.data.totalPages) {
      setPage(page + 1);
    }
  };

  const handleAddToCart = (car: ICar) => {
    addToCart(car);
    setModalOpen(true);
  };

  // Filter cars based on the search query
  const filteredCars = data?.data.cars.filter(
    (car: ICar) =>
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Cars</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by brand, model or description..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700">
            {error instanceof Error ? error.message : "Failed to fetch cars"}
          </p>
        </div>
      )}

      {filteredCars && filteredCars.length > 0 ? (
        <div className="py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car: ICar) => (
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
                    <h2 className="font-bold text-xl text-gray-800 mb-2">
                      {car.brand} {car.model}{" "}
                      <span className="text-gray-600">({car.year})</span>
                    </h2>

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
                        ৳ {car.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(car)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 border-t pt-6">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{data.data.totalPages}</span>
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePreviousPage}
                disabled={page <= 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  page <= 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNextPage}
                disabled={page >= (data.data.totalPages || 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  page >= (data.data.totalPages || 1)
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">No cars found for your search.</p>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center p-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Product added to cart!
          </h3>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
            <Link
              to="/cart"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProducts;
