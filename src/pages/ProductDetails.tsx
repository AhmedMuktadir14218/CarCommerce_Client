import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../redux/features/auth/carApi";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetCarByIdQuery(id!);
  const { addToCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>{error instanceof Error ? error.message : "Error loading product"}</p>
    );
  if (!data) return <p>Product not found</p>;

  const car = data.data;

  const handleAddToCart = () => {
    addToCart(car);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-full h-full">
      <div className="flex items-center h-full gap-8 lg:flex-row flex-col">
        <div className="w-full lg:w-1/2">
          <img
            src={car.imageUrl}
            alt={car.model}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {car.brand} {car.model} ({car.year})
          </h1>

          <p className="text-lg text-gray-600 mb-4">{car.description}</p>

          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">
              ৳ {car.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                car.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {car.inStock ? `In stock: ${car.quantity}` : "Out of stock"}
            </span>
          </div>

          <div className="space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={!car.inStock}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                car.inStock
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {car.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <Link
              to="/all-products"
              className="px-6 py-3 rounded-lg font-semibold text-blue-600 hover:text-blue-800"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>

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

export default ProductDetails;
