import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  error: null,
  selectedPost: {},
};

const BASE_URL = "https://advancedrestapi-nodejs.onrender.com/api/post";

// Axios interceptor'ı oluştur. Bu, her isteğe otomatik olarak token ekler.
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createTodo = createAsyncThunk("create", async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, data);
    if (res.data.status === "OK") {
      console.log("Post oluşturma işlemi başarılı.");
    }
    return res.data.newPost;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchPosts = createAsyncThunk(
  "fetchposts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/getAll`);
      if (res.data.status === "OK") {
        console.log("Postlar başarıyla getirildi.");
      }
      return res.data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPostDetails = createAsyncThunk(
  "fetchPostDetails",
  async (postId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/getDetail/${postId}`);
      return res.data.detailPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (postId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${postId}`);
      console.log("Post silme işlemi başarılı.");
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ data, postId }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/update/${postId}`, data);
      if (res.data.status === "OK") {
        console.log("Post başarıyla güncellendi.");
      }
      return res.data.updatedPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create
      .addCase(createTodo.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Post oluşturma hatası:", state.error);
      })

      //fetchPosts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Post getirme hatası:", state.error);
      })

      //fetchPostDetails
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Post detayları hatası:", state.error);
      })

      //delete
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Post silme hatası:", state.error);
      })
      //update
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id !== action.payload._id ? post : action.payload
        );
        state.selectedPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Post güncelleme hatası:", state.error);
      });
  },
});

export default postSlice.reducer;
