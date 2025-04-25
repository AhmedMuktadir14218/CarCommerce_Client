import React, { useState } from "react";
import {
  useCreateCarMutation,
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} from "../redux/features/auth/carApi";
import { ICar } from "../types/types";

const AddNewCar: React.FC = () => {
  // Form state
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2023);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Sedan");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [imageBase64, setImageBase64] = useState("");
  const [success, setSuccess] = useState(false);

  // Table state
  const {
    data,
    isLoading: isCarsLoading,
    refetch,
  } = useGetCarsQuery({ page: 1, limit: 100 });
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ICar>>({});

  // Form handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Resize image before converting to base64
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 800; // Set max width
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;
          
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // Compress
          setImageBase64(resizedBase64);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const [createCar, { isLoading, isError, error }] = useCreateCarMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!imageBase64) {
      alert("Please upload an image.");
      return;
    }

    const newCar = {
      brand,
      model,
      year,
      price,
      category,
      description,
      quantity,
      inStock,
      imageBase64,
    };

    try {
      await createCar(newCar).unwrap();
      setSuccess(true);
      setBrand("");
      setModel("");
      setYear(2023);
      setPrice(0);
      setCategory("Sedan");
      setDescription("");
      setQuantity(0);
      setInStock(true);
      setImageBase64("");
      refetch();
    } catch (err) {
      console.error("Failed to create car:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add a New Car
      </h2>
      {/* Car Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">In Stock</label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock((prev) => !prev)}
            className="form-checkbox h-5 w-5 text-green-600"
          />
        </div>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          {isLoading ? "Creating..." : "Create Car"}
        </button>
        {success && (
          <div className="text-green-600 font-medium">
            Car created successfully!
          </div>
        )}
        {isError && (
          <div className="text-red-600 font-medium">
            Error: {(error as any)?.data?.message || "Failed to create car."}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddNewCar;
