import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
  EntityId,
  //PayloadAction,
} from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./api";

// Define interfaces for user-related types
interface User {
  id: string | number;
  email?: string;
  password?: string;
  name?: string;
  [key: string]: any;
}

interface UserData {
  email?: string;
  password?: string;
  name?: string;
  [key: string]: any;
}

interface UserResponse extends User {
  message?: string;
  token?: string;
  id: string | number;
}

interface RootState {
  user: UserSliceState;
}

// Create a type that combines EntityState and additional state properties
type UserSliceState = EntityState<User, EntityId> & {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  message: string | null;
  token: string | null;
  user: User | null;
};

// Create an entity adapter for users with explicit type arguments
const userAdapter = createEntityAdapter<User>(
  {
    selectId: (user: User) => user.id,
  } as any // Use `as any` if the TypeScript type inference still fails.
);


// Async Thunks with TypeScript type annotations (biar mantap)
export const registerUserAsync = createAsyncThunk<
  UserResponse,
  UserData,
  { rejectValue: string }
>("user/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const loginUserAsync = createAsyncThunk<
  UserResponse,
  UserData,
  { rejectValue: string }
>("user/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await loginUser(userData);
    return response.data;
  } catch (error: any) {
    console.log("Kesalahan dari API login:", error.response?.data?.message);
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Initial state with type annotation
const initialState: UserSliceState = {
  ...userAdapter.getInitialState(),
  status: "idle",
  error: null,
  message: null,
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Optional: add logout reducer
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = "idle";
      userAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        if (action.payload.id) {
          userAdapter.addOne(state, action.payload);
        }
        state.status = "success";
        state.message = action.payload.message || null;
        state.user = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload.id) {
          userAdapter.addOne(state, action.payload);
        }
        state.status = "success";
        state.message = action.payload.message || null;
        state.token = action.payload.token || null;
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors<RootState>((state) => state.user);
