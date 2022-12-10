import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearStoreActionType,
  getUserActionType,
  loginUserActionType,
  registerUserActionType,
  updateUserActionType,
  userSliceName,
} from "constants/actionTypes";
import { authUserUrl, loginUserUrl, registerUserUrl } from "constants/apiUrls";
import { ValidationErrors } from "interfaces/errors";
import {
  AuthUserResponse,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "interfaces/users";
import { resetSpaceTechState } from "state/spaceTech/spaceTechSlice";
import { resetUserState } from "state/user/userSlice";
import customFetch from "utils/axios";
import { checkPermissions } from "utils/checkPermissions";
import { removeIsUserAuthenticatedFromLocalStorage } from "utils/localStorage";

const registerUser = createAsyncThunk<
  AuthUserResponse,
  RegisterUserRequest,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${registerUserActionType}`, async (newUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(`${registerUserUrl}`, newUser);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const loginUser = createAsyncThunk<
  AuthUserResponse,
  LoginUserRequest,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${loginUserActionType}`, async (loginUser, thunkAPI) => {
  try {
    const resp = await customFetch.post(`${loginUserUrl}`, loginUser);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const updateUser = createAsyncThunk<
  AuthUserResponse,
  UpdateUserRequest,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${updateUserActionType}`, async (updatingUser, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`${authUserUrl}`, updatingUser);
    return resp.data;
  } catch (error: any) {
    checkPermissions(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getUser = createAsyncThunk<
  AuthUserResponse,
  void,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${getUserActionType}`, async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get(`${authUserUrl}`);
    return resp.data;
  } catch (error: any) {
    checkPermissions(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const clearStore = createAsyncThunk<
  //eslint-disable-next-line
  Promise<any>,
  void,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(`${userSliceName}${clearStoreActionType}`, async (_, thunkAPI) => {
  try {
    removeIsUserAuthenticatedFromLocalStorage();
    thunkAPI.dispatch(resetUserState());
    thunkAPI.dispatch(resetSpaceTechState());
    return Promise.resolve();
  } catch (error) {
    thunkAPI.rejectWithValue(error);
    return Promise.reject();
  }
});

export { registerUser, loginUser, updateUser, getUser, clearStore };
