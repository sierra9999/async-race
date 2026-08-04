import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WinnersSortBy = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

interface WinnersUiState {
  page: number;
  sortBy: WinnersSortBy;
  order: SortOrder;
}

const initialState: WinnersUiState = {
  page: 1,
  sortBy: 'wins',
  order: 'DESC',
};

const winnersUiSlice = createSlice({
  name: 'winnersUi',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSortBy(state, action: PayloadAction<WinnersSortBy>) {
      state.sortBy = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
  },
});

export const { setPage, setSortBy, setOrder } = winnersUiSlice.actions;

export default winnersUiSlice.reducer;
