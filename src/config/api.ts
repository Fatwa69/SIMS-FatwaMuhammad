import axios, { AxiosInstance, AxiosResponse } from "axios";

// Create Axios instance with base configuration/ untuk mengirimkan request ke server
export const API: AxiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
});

// Set authentication token function
export const setAuthToken = (token: string | null): void => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// response interface buat response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

interface ProfileData {
  first_name?: string;
  last_name?: string;
  profile_image?: File | string;
}

interface TransactionData {
  service_id: number;
  amount: number;
}

export const registerUser = (userData: UserData): Promise<AxiosResponse> =>
  API.post("/registration", userData);

export const loginUser = (userData: UserData): Promise<AxiosResponse> =>
  API.post("/login", userData);

export const profile = (): Promise<AxiosResponse<ApiResponse<ProfileData>>> =>
  API.get("/profile");

export const profileEdit = (profileData: ProfileData): Promise<AxiosResponse> =>
  API.put("/profile/update", profileData);

export const ProfileEditImage = (
  profileImage: FormData
): Promise<AxiosResponse<ApiResponse>> =>
  API.put("/profile/image", profileImage);

export const Balance = (): Promise<
  AxiosResponse<ApiResponse<{ balance: number }>>
> => API.get("/balance");

export const Services = (): Promise<AxiosResponse<ApiResponse<any[]>>> =>
  API.get("/services");

export const Banner = (): Promise<AxiosResponse<ApiResponse<any[]>>> =>
  API.get("/banner");

export const Topup = (
  topupData: TopupData
): Promise<AxiosResponse<ApiResponse>> => API.post("/topup", topupData);

export const Transaction = (
  transactionData: TransactionData
): Promise<AxiosResponse<ApiResponse>> =>
  API.post("/transaction", transactionData);

export const fetchTransactionHistory = (): Promise<
  AxiosResponse<ApiResponse<any[]>>
> => API.get("/transaction/history");
