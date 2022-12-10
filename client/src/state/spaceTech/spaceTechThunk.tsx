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
    // state: RootState;
  }
>(
  `${spaceTechSliceName}${getAllSpaceTechFromPublicApiActionType}`,
  async (_, thunkAPI) => {
    try {
      // const { page, search, sort, status, monitoring, host } =
      //   thunkAPI.getState().allApis;

      const resp = await customFetch.get(
        getAllSpaceTechFromPublicApiUrl
        //   , {
        //   params: {
        //     sort,
        //     status,
        //     monitoring,
        //     host,
        //     page,
        //     search,
        //   },
        // }
      );
      return resp.data;
    } catch (error) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error);
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
    } catch (error) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error);
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
    } catch (error) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error);
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
    } catch (error) {
      checkPermissions(error, thunkAPI);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  getAllSpaceTechFromPublicApi,
  getAllSpaceTechFromSavedList,
  addSpaceTech,
  deleteSpaceTech,
};
