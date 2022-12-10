import { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const showToast = (
  resultAction:
    | PayloadAction<
        any,
        any,
        {
          arg: any;
          requestId: any;
          requestStatus: any;
        },
        never
      >
    | PayloadAction<any>,
  asyncThunk: AsyncThunk<
    any,
    any,
    { rejectValue: any; dispatch: any; state: any }
  >,
  defaultSuccessMsg: string,
  defaultErrorMsg: string
) => {
  toast.loading("Please wait...");

  if (asyncThunk.fulfilled.match(resultAction)) {
    toast.dismiss();

    const { message } = resultAction.payload;

    if (message) {
      toast.success(message);
    } else {
      toast.success(defaultSuccessMsg);
    }

    return { status: "success", payload: resultAction.payload };
  }

  toast.dismiss();

  const { message, errors } = resultAction.payload;

  if (message || errors) {
    toast.error(`${message || errors[0]}`);
  } else {
    toast.error(defaultErrorMsg);
  }

  return { status: "error" };
};

const showToastErrorsOnly = (
  resultAction:
    | PayloadAction<
        any,
        any,
        {
          arg: any;
          requestId: any;
          requestStatus: any;
        },
        never
      >
    | PayloadAction<any>,
  asyncThunk: AsyncThunk<
    any,
    any,
    { rejectValue: any; dispatch: any; state: any }
  >,
  defaultErrorMsg: string
) => {
  if (!asyncThunk.fulfilled.match(resultAction)) {
    const { message, errors } = resultAction.payload;

    if (message || errors) {
      toast.error(`${message || errors[0]}`);
    } else {
      toast.error(defaultErrorMsg);
    }

    return { status: "error" };
  }

  return { status: "success", payload: resultAction.payload };
};

export { showToast, showToastErrorsOnly };
