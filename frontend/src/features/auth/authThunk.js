import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/user";

// Async Thunks
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("username", data.user.username);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${id}`);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);