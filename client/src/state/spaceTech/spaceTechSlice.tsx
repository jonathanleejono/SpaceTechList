import { createSlice } from "@reduxjs/toolkit";
import { spaceTechSliceName } from "constants/actionTypes";
import {
  SpaceTechPublicApiResponse,
  SpaceTechSavedResponse,
} from "interfaces/spaceTech";
import {
  addSpaceTech,
  deleteSpaceTech,
  getAllSpaceTechFromPublicApi,
  getAllSpaceTechFromSavedList,
} from "state/spaceTech/spaceTechThunk";

interface SpaceTechState {
  isLoading: boolean;
  spaceTechFromPublicApi: SpaceTechPublicApiResponse[];
  spaceTechFromSavedList: SpaceTechSavedResponse[];
  savedSpaceTechIdCodes: string[];
}

const initialState: SpaceTechState = {
  isLoading: false,
  spaceTechFromPublicApi: [],
  spaceTechFromSavedList: [],
  savedSpaceTechIdCodes: [],
};

const spaceTechSlice = createSlice({
  name: spaceTechSliceName,
  initialState,
  reducers: {
    resetSpaceTechState: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSpaceTechFromPublicApi.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getAllSpaceTechFromPublicApi.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.spaceTechFromPublicApi = payload;
        }
      ),
      builder.addCase(getAllSpaceTechFromPublicApi.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(getAllSpaceTechFromSavedList.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        getAllSpaceTechFromSavedList.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.spaceTechFromSavedList = payload;
          state.savedSpaceTechIdCodes = payload.map(
            (spaceTech) => spaceTech.idCode
          );
        }
      ),
      builder.addCase(getAllSpaceTechFromSavedList.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(addSpaceTech.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(addSpaceTech.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.savedSpaceTechIdCodes.push(payload.idCode);
      }),
      builder.addCase(addSpaceTech.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(deleteSpaceTech.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(deleteSpaceTech.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(deleteSpaceTech.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetSpaceTechState } = spaceTechSlice.actions;

export default spaceTechSlice.reducer;
