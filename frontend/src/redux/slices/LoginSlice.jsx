import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const params = {
        email: email,
        password: password,
      };

      let url = "http://localhost:8080/api/v1/users/login";

      const response = await axios.post(url, params, {
        headers: { "Content-Type": "application/json" },
      });

      let data = response.data;

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    isFetching: "",
    isSuccess: "",
    isError: "",
    errorMessage: "",
  },

  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;

        return state;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = LoginSlice.actions;

export const loginSelector = (state) => state.login;
