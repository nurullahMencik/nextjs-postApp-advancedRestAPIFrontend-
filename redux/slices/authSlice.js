import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  error: null,
};
const BASE_URL = "https://advancedrestapi-nodejs.onrender.com/api/auth";

export const Register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, data);
    if (res.data.status == "OK") {
      alert("kayıt işlemi başarılı");
    }

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const Login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, data);
    if (res.data.status == "OK") {
      alert("Giriş işlemi başarılı");
    }
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      //register
      .addCase(Register.fulfilled, (state, action) => {
        state.user = action.payload.newUser;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(Register.rejected, (state, action) => {
        state.error = action.payload;
        alert(state.error);
      })
      //login
      .addCase(Login.fulfilled,(state,action)=>{
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(Login.rejected, (state, action) => {
        state.error = action.payload;
        alert(state.error);
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
