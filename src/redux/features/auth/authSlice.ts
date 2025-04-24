// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { authApi } from './authApi';

// interface AuthState {
//   user: { email: string; role: string } | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials(state, action: PayloadAction<{ user: any; token: string }>) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logout(state) {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       authApi.endpoints.login.matchFulfilled,
//       (state, { payload }) => {
//         state.token = payload.data.token;
//         state.user = payload.data.user;
//       }
//     );
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authApi';

interface User {
  email: string;
  role: string;
  // You can expand with more fields if needed (e.g., id, name)
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.token;
        state.user = payload.data.user;
      }
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
