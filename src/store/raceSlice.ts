import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CarRaceStatus = 'idle' | 'starting' | 'driving' | 'finished' | 'broken' | 'stopping';
interface RaceState {
  carStates: Record<number, CarRaceStatus>;
  generation: Record<number, number>;
}

const initialState: RaceState = {
  carStates: {},
  generation: {},
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarState(state, action: PayloadAction<{ id: number; status: CarRaceStatus }>) {
      const { id, status } = action.payload;
      state.carStates[id] = status;
    },
    bumpGeneration(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.generation[id] = (state.generation[id] ?? 0) + 1;
    },
    forgetCar(state, action: PayloadAction<number>) {
      delete state.carStates[action.payload];
      delete state.generation[action.payload];
    },
  },
});

export const { setCarState, bumpGeneration, forgetCar } = raceSlice.actions;
export default raceSlice.reducer;
