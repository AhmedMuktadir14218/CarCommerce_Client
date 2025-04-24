// // src/redux/features/auth/orderApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from '../../store';

// export const orderApi = createApi({
//   reducerPath: 'orderApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     createOrder: builder.mutation<any, any>({
//       query: (orderData) => ({
//         url: '/orders',
//         method: 'POST',
//         body: orderData,
//       }),
//     }),

//     getUserOrders: builder.query({
//       query: ({ userId, page = 1, limit = 5 }) =>
//         `/orders/users/${userId}?page=${page}&limit=${limit}`,
//     }),
//   }),
// });

// export const { useCreateOrderMutation, useGetUserOrdersQuery } = orderApi;

// src/redux/features/auth/orderApi.ts
import { baseApi } from '../../api/baseApi';

const ORDER_TAG = 'Orders';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: [ORDER_TAG],
    }),

    getUserOrders: builder.query<any, { userId: string; page?: number; limit?: number }>({
      query: ({ userId, page = 1, limit = 5 }) =>
        `/orders/users/${userId}?page=${page}&limit=${limit}`,
      providesTags: [ORDER_TAG],
    }),

    getAllOrders: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `/orders?page=${page}&limit=${limit}`,
      providesTags: [ORDER_TAG],
    }),

    updateOrderStatus: builder.mutation<any, { orderId: string; status: string }>({
      query: ({ orderId, status }) => ({
        url: `/orders/status/${orderId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: [ORDER_TAG],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
