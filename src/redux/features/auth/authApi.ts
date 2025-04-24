import { baseApi } from '../../api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ data: { token: string; user: any } }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<{ success: boolean }, { email: string; password: string }>({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;