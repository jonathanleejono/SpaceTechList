import { createSlice } from "@reduxjs/toolkit";
import { userSliceName } from "constants/actionTypes";
import { AuthUserResponse } from "interfaces/users";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "state/user/userThunk";
import { getIsUserAuthenticatedFromLocalStorage } from "utils/localStorage";

interface UsersState {
  isLoading: boolean;
  user: AuthUserResponse;
  isUserAuthenticated: boolean;
}

const initialState: UsersState = {
  isLoading: false,
  user: { id: 0, firstName: "", lastName: "", email: "" },
  isUserAuthenticated: getIsUserAuthenticatedFromLocalStorage(),
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
        state.isUserAuthenticated = true;
      }),
      builder.addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isUserAuthenticated = false;
      });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isUserAuthenticated = true;
      }),
      builder.addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isUserAuthenticated = false;
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
        state.isUserAuthenticated = false;
      });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isUserAuthenticated = true;
      }),
      builder.addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isUserAuthenticated = false;
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
