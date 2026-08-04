import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CAR_COLOR } from '@/constants';

interface CarFormFields {
  name: string;
  color: string;
}

interface EditFormFields extends CarFormFields {
  carId: number | null;
}

interface GarageUiState {
  page: number;
  createForm: CarFormFields;
  editForm: EditFormFields;
}

const initialCreateForm: CarFormFields = { name: '', color: DEFAULT_CAR_COLOR };
const initialEditForm: EditFormFields = { carId: null, name: '', color: DEFAULT_CAR_COLOR };
const initialState: GarageUiState = {
  page: 1,
  createForm: initialCreateForm,
  editForm: initialEditForm,
};

const garageUiSlice = createSlice({
  name: 'garageUi',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCreateForm(state, action: PayloadAction<Partial<CarFormFields>>) {
      state.createForm = { ...state.createForm, ...action.payload };
    },
    resetCreateForm(state) {
      state.createForm = initialCreateForm;
    },
    setEditForm(state, action: PayloadAction<Partial<EditFormFields>>) {
      state.editForm = { ...state.editForm, ...action.payload };
    },
    resetEditForm(state) {
      state.editForm = initialEditForm;
    },
  },
});

export const { setPage, setCreateForm, resetCreateForm, setEditForm, resetEditForm } =
  garageUiSlice.actions;
export default garageUiSlice.reducer;
