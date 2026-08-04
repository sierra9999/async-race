import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GarageUiState {
  page: number;
}

const initialState: GarageUiState = {
  page: 1,
};

const garageUiSlice = createSlice({
  name: 'garageUi',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = garageUiSlice.actions;
export default garageUiSlice.reducer;
