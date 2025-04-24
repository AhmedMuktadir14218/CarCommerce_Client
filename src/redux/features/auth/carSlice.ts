// carSlice.ts - FIXED TO USE carApi INSTEAD OF DIRECT FETCH
import { createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../../types/types';
import { carApi } from './carApi';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [] as ICar[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(carApi.endpoints.createCar.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(carApi.endpoints.createCar.matchFulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addMatcher(carApi.endpoints.createCar.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to create car';
      })
      .addMatcher(carApi.endpoints.updateCar.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(carApi.endpoints.updateCar.matchFulfilled, (state, action) => {
        state.loading = false;
        const index = state.cars.findIndex((car) => car._id === action.payload._id);
        if (index >= 0) {
          state.cars[index] = action.payload;
        }
      })
      .addMatcher(carApi.endpoints.updateCar.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to update car';
      });
  },
});

export default carSlice.reducer;