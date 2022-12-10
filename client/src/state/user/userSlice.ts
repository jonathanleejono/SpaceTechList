import { createSlice } from "@reduxjs/toolkit";
import { userSliceName } from "constants/actionTypes";
import { AuthUserResponse } from "interfaces/users";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "state/user/userThunk";

interface UsersState {
  isLoading: boolean;
  user: AuthUserResponse;
}

const initialState: UsersState = {
  isLoading: false,
  user: { id: 0, firstName: "", lastName: "", email: "" },
};

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    resetUserState: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      }),
      builder.addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      }),
      builder.addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      }),
      builder.addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      }),
      builder.addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
