import React, { useState } from "react";
import {
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../redux/features/auth/carApi";
import { ICar } from "../types/types";

const CarManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: carsResponse,
    isLoading,
    refetch,
  } = useGetCarsQuery({ page, limit });
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const cars = carsResponse?.data?.cars || [];
  const totalPages = carsResponse?.data?.totalPages || 1;

  // Table edit handlers
  const handleEdit = (car) => {
    setEditId(car._id);
    setEditData(car);
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleEditStock = (e) => {
    setEditData((prev) => ({
      ...prev,
      inStock: e.target.value === "true",
    }));
  };

  const handleSave = async () => {
    if (!editId) return;
    await updateCar({ ...editData, _id: editId }).unwrap();
    setEditId(null);
    setEditData({});
    refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this car?")) {
      await deleteCar(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Car Management</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <p className="mt-2 text-lg font-medium text-gray-700">
            No cars found
          </p>
          <p className="mt-1 text-gray-500">
            Add new cars to your inventory to manage them here.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cars.map((car) =>
              editId === car._id ? (
                <div
                  key={car._id}
                  className="bg-yellow-50 p-6 border border-yellow-200 rounded-lg shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Brand
                      </label>
                      <input
                        name="brand"
                        value={editData.brand || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Model
                      </label>
                      <input
                        name="model"
                        value={editData.model || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Year
                      </label>
                      <input
                        name="year"
                        type="number"
                        value={editData.year || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        value={editData.price || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={editData.category || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Truck">Truck</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Convertible">Convertible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Quantity
                      </label>
                      <input
                        name="quantity"
                        type="number"
                        value={editData.quantity || ""}
                        onChange={handleEditChange}
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        In Stock
                      </label>
                      <select
                        name="inStock"
                        value={editData.inStock ? "true" : "false"}
                        onChange={handleEditStock}
                        className="w-full border rounded p-2"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={car._id}
                  className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {car.brand} {car.model}
                      </span>
                      <h3 className="font-medium text-gray-900">{car.year}</h3>
                    </div>

                    <div className="inline-flex">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          car.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </span>
                      <span className="text-gray-900">{car.category}</span>
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </span>
                      <span className="text-gray-900">{car.quantity}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default CarManagement;
