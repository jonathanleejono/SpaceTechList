import { unauthorizedMsg } from "constants/messages";
import { clearStore } from "state/user/userThunk";

//eslint-disable-next-line
export const checkPermissions = (error: any, thunkAPI: any) => {
  const errorCode = error.response.status;

  if (errorCode.toString()[0] != "2") {
    thunkAPI.dispatch(clearStore());

    return thunkAPI.rejectWithValue(unauthorizedMsg);
  }
};
