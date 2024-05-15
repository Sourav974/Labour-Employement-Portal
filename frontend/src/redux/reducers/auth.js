import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await fetch("../../data.json");
  return response.json();
  
});


const auth = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    token:null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      
    
    });

    builder.addCase(fetchUser, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default auth.reducer;
