import React, { useState } from "react";
import {
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../redux/features/auth/carApi";
import { ICar } from "../types/types";

const CarTable: React.FC = () => {
  const { data, isLoading, refetch } = useGetCarsQuery({ page: 1, limit: 100 });
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ICar>>({});

  if (isLoading) return <div>Loading...</div>;

  const handleEdit = (car: ICar) => {
    setEditId(car._id);
    setEditData(car);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!editId) return;
    await updateCar({ ...editData, _id: editId } as ICar).unwrap();
    setEditId(null);
    setEditData({});
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this car?")) {
      await deleteCar(id).unwrap();
      refetch();
    }
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">In Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.cars.map((car) =>
            editId === car._id ? (
              <tr key={car._id} className="bg-yellow-50">
                <td className="p-2 border">
                  <input
                    name="brand"
                    value={editData.brand || ""}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="model"
                    value={editData.model || ""}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="year"
                    type="number"
                    value={editData.year || ""}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    name="price"
                    type="number"
                    value={editData.price || ""}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </td>
                <td className="p-2 border">
                  <select
                    name="category"
                    value={editData.category || ""}
                    onChange={handleChange}
                    className="border p-1"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <input
                    name="quantity"
                    type="number"
                    value={editData.quantity || ""}
                    onChange={handleChange}
                    className="border p-1"
                  />
                </td>
                <td className="p-2 border">
                  <select
                    name="inStock"
                    value={editData.inStock ? "true" : "false"}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        inStock: e.target.value === "true",
                      }))
                    }
                    className="border p-1"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button onClick={handleSave} className="text-green-600 mr-2">
                    Save
                  </button>
                  <button onClick={() => setEditId(null)} className="text-gray-600">
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={car._id}>
                <td className="p-2 border">{car.brand}</td>
                <td className="p-2 border">{car.model}</td>
                <td className="p-2 border">{car.year}</td>
                <td className="p-2 border">${car.price}</td>
                <td className="p-2 border">{car.category}</td>
                <td className="p-2 border">{car.quantity}</td>
                <td className="p-2 border">{car.inStock ? "Yes" : "No"}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(car)} className="text-blue-600 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(car._id)} className="text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;