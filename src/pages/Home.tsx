import { useState } from "react";
import { useGetCarsQuery } from "../redux/features/auth/carApi";
import { Link } from "react-router-dom";
import { ICar } from "../types/types";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  const { data } = useGetCarsQuery({ page: 1, limit: 6 });
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddToCart = (car: ICar) => {
    addToCart(car);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Banner Section */}
        <Banner />

        {/* Featured Products Section */}
        <FeaturedProducts
          products={data?.data?.cars || []}
          isLoading={!data}
          onAddToCart={handleAddToCart}
        />

        {/* Extra Section - Testimonials */}
        <Testimonials />
      </main>

      {/* Cart Add Confirmation Modal */}
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

export default HomePage;
