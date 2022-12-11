import { clearStore } from "state/user/userThunk";

//eslint-disable-next-line
export const checkPermissions = (error: any, thunkAPI: any) => {
  const errorCode = error.response.status;

  if (errorCode.toString() === ("401" || "403" || "404" || "429" || "500")) {
    thunkAPI.dispatch(clearStore());

    return thunkAPI.rejectWithValue({
      message: "Session Expired! Logging out...",
    });
  }
};
