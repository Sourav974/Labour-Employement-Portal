import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      let url = "http://localhost:8080/api/v1/users/signup";
      const params = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const response = axios.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });

      let data = await response.data;
      console.log("Data", data);

      if (data.data.status === 201) {
     
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
     
      console.log("Error", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },

  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.errorMessage;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = SignupSlice.actions;

export const signupSelector = (state) => state.signup;
