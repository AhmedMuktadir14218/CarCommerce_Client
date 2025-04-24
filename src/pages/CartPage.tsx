import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../redux/features/auth/orderApi";
import { useAppSelector } from "../redux/hooks";

const CartPage = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const { cart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleCheckout = async () => {
    if (!token) {
      alert("Please log in to proceed with checkout.");
      navigate("/login");
      return;
    }

    const orderData = {
      cars: cart.map((item) => ({
        car: item._id,
        quantity: item.quantityInCart,
      })),
    };

    try {
      const res = await createOrder(orderData).unwrap();
      if (res.success && res.payment.checkoutUrl) {
        clearCart();
        window.open(res.payment.checkoutUrl, "_blank");
      } else {
        alert("Something went wrong during checkout.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Checkout failed.");
    }
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantityInCart,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-1 text-gray-500">
            Looks like you haven't added any cars to your cart yet.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/all-products")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="hidden md:flex bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="w-2/5 font-medium text-gray-700">Product</div>
              <div className="w-1/5 text-center font-medium text-gray-700">
                Price
              </div>
              <div className="w-1/5 text-center font-medium text-gray-700">
                Quantity
              </div>
              <div className="w-1/5 text-right font-medium text-gray-700">
                Total
              </div>
            </div>

            {cart.map((item) => (
              <div
                key={item._id}
                className="border-b border-gray-200 last:border-b-0 px-6 py-4"
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  {/* Product Info - Mobile & Desktop */}
                  <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center mr-4">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.brand} {item.model}
                      </h3>
                      <p className="text-sm text-gray-500">Year: {item.year}</p>
                      <p className="text-xs text-gray-500 md:hidden">
                        Stock: {item.quantity} available
                      </p>
                    </div>
                  </div>

                  {/* Price - Mobile & Desktop */}
                  <div className="w-full md:w-1/5 flex justify-between md:justify-center items-center mb-2 md:mb-0">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Price:
                    </span>
                    <span className="font-semibold text-gray-800">
                      $
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {/* Quantity Controls - Mobile & Desktop */}
                  <div className="w-full md:w-1/5 flex justify-between md:justify-center items-center mb-2 md:mb-0">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        disabled={item.quantityInCart <= 1}
                        className={`px-3 py-1 text-gray-600 hover:bg-gray-100 ${
                          item.quantityInCart <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-medium text-gray-800">
                        {item.quantityInCart}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        disabled={item.quantityInCart >= item.quantity}
                        className={`px-3 py-1 text-gray-600 hover:bg-gray-100 ${
                          item.quantityInCart >= item.quantity
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total - Mobile & Desktop */}
                  <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center">
                    <span className="text-sm font-medium text-gray-600 md:hidden">
                      Total:
                    </span>
                    <span className="font-semibold text-gray-800">
                      $
                      {(item.price * item.quantityInCart).toLocaleString(
                        "en-US",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Cart Summary
            </h2>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">
                $
                {cartTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-800">Free</span>
            </div>
            <div className="flex justify-between py-2 mt-2">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-900">
                $
                {cartTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
