import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addSpaceTechActionType,
  deleteSpaceTechActionType,
  getAllSpaceTechFromPublicApiActionType,
  getAllSpaceTechFromSavedListActionType,
  spaceTechSliceName,
} from "constants/actionTypes";
import {
  addSpaceTechUrl,
  deleteSpaceTechUrl,
  getAllSpaceTechFromPublicApiUrl,
  getAllSpaceTechFromSavedListUrl,
} from "constants/apiUrls";
import { ValidationErrors } from "interfaces/errors";
import {
  SpaceTechPublicApiResponse,
  SpaceTechRequest,
  SpaceTechSavedResponse,
} from "interfaces/spaceTech";
import { AppDispatch } from "state/store";
import customFetch from "utils/axios";
import { checkPermissions } from "utils/checkPermissions";

const getAllSpaceTechFromPublicApi = createAsyncThunk<
  SpaceTechPublicApiResponse[],
  void,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(
  `${spaceTechSliceName}${getAllSpaceTechFromPublicApiActionType}`,
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get(getAllSpaceTechFromPublicApiUrl);
      return resp.data;
    } catch (error: any) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllSpaceTechFromSavedList = createAsyncThunk<
  SpaceTechSavedResponse[],
  void,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(
  `${spaceTechSliceName}${getAllSpaceTechFromSavedListActionType}`,
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get(getAllSpaceTechFromSavedListUrl);
      return resp.data;
    } catch (error: any) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addSpaceTech = createAsyncThunk<
  SpaceTechSavedResponse,
  SpaceTechRequest,
  {
    rejectValue: Partial<ValidationErrors>;
  }
>(
  `${spaceTechSliceName}${addSpaceTechActionType}`,
  async (newSpaceTech, thunkAPI) => {
    try {
      const resp = await customFetch.post(`${addSpaceTechUrl}`, newSpaceTech);
      return resp.data;
    } catch (error: any) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteSpaceTech = createAsyncThunk<
  SpaceTechSavedResponse,
  string, // the type for "_id"
  {
    rejectValue: Partial<ValidationErrors>;
    dispatch: AppDispatch;
  }
>(
  `${spaceTechSliceName}${deleteSpaceTechActionType}`,
  async (_id, thunkAPI) => {
    try {
      const resp = await customFetch.delete(`${deleteSpaceTechUrl}/${_id}`);
      thunkAPI.dispatch(getAllSpaceTechFromSavedList());
      return resp.data;
    } catch (error: any) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export {
  getAllSpaceTechFromPublicApi,
  getAllSpaceTechFromSavedList,
  addSpaceTech,
  deleteSpaceTech,
};
