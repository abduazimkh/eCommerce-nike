import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";
import { User } from "../../types/ElementTypes.d";

const createUser = createAsyncThunk("auth/createUser", async (data: User) => {
  try {
    const response: AxiosResponse = await axios.post("/auth/register", data);
    return response.data.payload;
  } catch (error: any) {
    if (error.response.status === 409) {
      window.location.href = window.location.origin + "/sign-in";
    }
  }
});

const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: User, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post("/auth/login", data);
      return response.data.payload;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const getUser = createAsyncThunk(
  "auth/getUser",
  async (value, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await axios.get("/auth/profile");
      if(response.status === 401 ||response.status === 403){
        throw new Error("Auth failed")
      }
      return response.data.payload;
    } 
    catch (error:any) {
      return rejectWithValue(error);
    }
  }
)

interface initialAuthType {
  token: string;
  _id: number | null
  user: User | null
}

const initialState: initialAuthType = {
  token: (sessionStorage.getItem("token") as string) || "",
  _id: null,
  user: JSON.parse(localStorage.getItem("user") as string) || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state._id = null,
      state.user = null
      state.token = ""
      sessionStorage.removeItem("token");
      window.location.href = window.location.origin + "/sign-in";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload?.token) {
        sessionStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state._id = action.payload.user._id;
      }
      window.location.href = window.location.origin + "/dashboard";
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.token) {
          sessionStorage.setItem("token", action.payload.token);
          sessionStorage.setItem("user", JSON.stringify(action.payload.user));
          state.token = action.payload.token;
          state._id = action.payload.user._id;
        }

        window.location.href = window.location.origin + "/dashboard";
      }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
      }),
      builder.addCase(getUser.rejected, (state) => {
        state._id = null
        state.token = ""
        state.user = null
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user")
        window.location.href = window.location.origin + "/sign-in";
      })
  },
});

export const {logOut} = authSlice.actions;
export { createUser, loginUser, getUser };
export default authSlice.reducer;
