
import { ICar } from "../../../types/types";
import { baseApi } from "../../api/baseApi";

interface CarsResponse {
  message: string;
  success: boolean;
  data: {
    cars: ICar[];
    totalPages: number;
    currentPage: number;
    totalCars: number;
  };
}

interface CarByIdResponse {
  message: string;
  success: boolean;
  data: ICar;
}

// export const carApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getCars: builder.query<CarsResponse, { page: number; limit: number }>({
//       query: ({ page, limit }) => `/cars?page=${page}&limit=${limit}`,
//     }),
//     getCarById: builder.query<CarByIdResponse, string>({
//       query: (id) => `/cars/${id}`,
//     }),
//   }),
// });

export const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<CarsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/cars?page=${page}&limit=${limit}`,
    }),
    getCarById: builder.query<CarByIdResponse, string>({
      query: (id) => `/cars/${id}`,
    }),
    createCar: builder.mutation<ICar, Partial<ICar>>({
      query: (carData) => ({
        url: '/cars',
        method: 'POST',
        body: carData,
      }),
    }),
    updateCar: builder.mutation<ICar, ICar>({
      query: (carData) => ({
        url: `/cars/${carData._id}`,
        method: 'PUT',
        body: carData,
      }),
    }),
    deleteCar: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;





// export const { useGetCarsQuery, useGetCarByIdQuery } = carApi;

 