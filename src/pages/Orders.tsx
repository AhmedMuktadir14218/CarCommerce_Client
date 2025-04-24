import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/features/auth/orderApi";

const Orders = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: ordersResponse,
    isLoading,
  } = isAdmin
    ? useGetAllOrdersQuery({ page, limit })
    : useGetUserOrdersQuery({ userId: user?._id, page, limit });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orders = ordersResponse?.data?.orders || [];
  const totalPages = ordersResponse?.data?.totalPages || 1;

  const [status, setStatus] = useState<{ [key: string]: string }>({});

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setStatus((prevStatus) => ({ ...prevStatus, [orderId]: newStatus }));
  };

  const handleSaveStatus = async (orderId: string) => {
    const newStatus = status[orderId];
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      alert("Order status updated!");
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isAdmin ? "All Orders" : "Your Orders"}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-lg font-medium text-gray-700">No orders found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </span>
                    <h3 className="font-medium text-gray-900">{order._id}</h3>
                  </div>

                  {isAdmin && (
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Orderer:</span>{" "}
                        {order.user?._id}
                      </p>
                    </div>
                  )}

                  <div>
                    {isAdmin ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={status[order._id] || order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 text-sm"
                        >
                          {[
                            "Pending",
                            "Paid",
                            "Shipped",
                            "Completed",
                            "Cancelled",
                          ].map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                              {statusOption}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleSaveStatus(order._id)}
                          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${order.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </span>
                    <span className="text-gray-900">
                      {order.cars.reduce((acc, car) => acc + car.quantity, 0)}{" "}
                      items
                    </span>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </span>
                    <span className="text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-700">
                Page <span className="font-medium">{page}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </span>

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
