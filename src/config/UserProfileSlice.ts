import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import {
  profile,
  setAuthToken,
  profileEdit,
  ProfileEditImage,
  Balance,
  Services,
  Banner,
  Topup,
  Transaction,
} from "./api";
import Swal from "sweetalert2";



interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}


interface TransactionData {
  service_id: number;
  service_code: string; 
  amount: number; 
}
interface ProfileState {
  data: any | null;
  balance: number | null;
  services: any[] | null;
  banner: any[] | null;
  transaction: {
    records: Transaction[];
    offset: number;
  };
  offset: number;
  error: string | null;
  status: "idle" | "loading" | "success" | "failed";
}

interface ProfileData {
  [key: string]: any;
}


const profileAdapter = createEntityAdapter();

// Async Thunks with TypeScript type annotations

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await profile();
      return response.data.data;
    } catch (error: any) {
      console.log("kesalahan profile :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editProfileAsync = createAsyncThunk(
  "profile/editProfile",
  async (profileData: ProfileData, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await profileEdit(profileData);
      console.log("ini dari edit profile", response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log("kesalahan edit profile :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editProfileImageAsync = createAsyncThunk(
  "profile/editProfileImage",
  async (profileData: FormData, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await ProfileEditImage(profileData);
      console.log("respon true edit image", response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log("kesalahan edit image :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  "profile/fetchBalance",
  async (_, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await Balance();
      return response.data.data;
    } catch (error: any) {
      console.log("kesalahan balance :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchServices = createAsyncThunk(
  "profile/fetchServices",
  async (_, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await Services();
      return response.data;
    } catch (error: any) {
      console.log("error services :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchBanner = createAsyncThunk(
  "profile/fetchBanner",
  async (_, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await Banner();
      return response.data.data;
    } catch (error: any) {
      console.log("error banner :", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const TopUpMoney = createAsyncThunk(
  "profile/topup",
  async (topupData: TopupData, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await Topup(topupData); 
      return response.data.data;
    } catch (error: any) {
      console.log("Error Top Up :", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Top Up Gagal",
        text: `${error.response?.data?.message}`,
      });
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const TransactionAsync = createAsyncThunk(
  "profile/transaction",
  async (transactionData: TransactionData, { rejectWithValue }) => {
    setAuthToken(localStorage.getItem("jwtToken"));
    try {
      const response = await Transaction(transactionData); 
      console.log("respon dari transaction", response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.log("kesalahan transaction:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState: ProfileState = {
  ...profileAdapter.getInitialState(),
  data: null,
  balance: null,
  services: null,
  banner: null,
  transaction: {
    records: [],
    offset: 0,
  },
  offset: 0,
  error: null,
  status: "idle",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(editProfileImageAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProfileImageAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload.balance;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "success";
    
        if (
          !state.services ||
          JSON.stringify(state.services) !== JSON.stringify(action.payload.data)
        ) {
          state.services = action.payload.data;
        }
      })

      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "success";
        state.banner = action.payload;
      })
      .addCase(TopUpMoney.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload;
      })
      .addCase(TransactionAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload;
      })
      .addCase(TransactionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
  },
});

export default profileSlice.reducer;
export const { selectAll: selectAllprofiles } = profileAdapter.getSelectors(
  (state: any) => state.profile
);
export const selectServices = createSelector(
  (state: RootState) => state.profile.services,
  (services) => services || []
);


