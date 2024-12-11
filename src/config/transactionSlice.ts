import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactionHistory, setAuthToken } from "./api"; // Import the function you defined in api.ts
import { AxiosResponse } from "axios";

interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch transaction history
export const getTransactionHistory = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/getTransactionHistory", async (_, { rejectWithValue }) => {
  try {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("JWT Token not found in localStorage");
      return rejectWithValue("Authentication token not found. Please log in.");
    }

    // Set the token in Axios
    setAuthToken(token);

    // Fetch transaction history
    const response: AxiosResponse = await fetchTransactionHistory();

    // Log the response for debugging
    console.log("Response:", response.data);

    // Check response status
    if (response.data.status !== 0) {
      return rejectWithValue(
        response.data.message || "Failed to fetch transactions"
      );
    }

    return response.data.data?.records || [];
  } catch (error: any) {
    console.error(
      "Error:",
      error.response?.data || error.message || "Something went wrong"
    );
    return rejectWithValue(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTransactionHistory.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
