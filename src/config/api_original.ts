import axios, { AxiosInstance, AxiosResponse } from "axios";


// Create axios instance with base configuration
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

// API service functions with proper type annotations
export const registerUser = (userData: UserData): Promise<AxiosResponse> =>
  API.post("/registration", userData);

export const loginUser = (userData: UserData): Promise<AxiosResponse> =>
  API.post("/login", userData);

export const profile = (profileData?: ProfileData): Promise<AxiosResponse> =>
  API.get("/profile", { params: profileData });

export const profileEdit = (profileData: ProfileData): Promise<AxiosResponse> =>
  API.put("/profile/update", profileData);

export const ProfileEditImage = (
  profileData: FormData
): Promise<AxiosResponse> => API.put("/profile/image", profileData);

export const Balance = (profileData?: ProfileData): Promise<AxiosResponse> =>
  API.get("/balance", { params: profileData });

export const Services = (profileData?: ProfileData): Promise<AxiosResponse> =>
  API.get("/services", { params: profileData });

export const Banner = (profileData?: ProfileData): Promise<AxiosResponse> =>
  API.get("/banner", { params: profileData });

export const Topup = (profileData: ProfileData): Promise<AxiosResponse> =>
  API.post("/topup", profileData);

export const Transaction = (profileData: ProfileData): Promise<AxiosResponse> =>
  API.post("/transaction", profileData);

export const ListTransaction = (
  profileData?: ProfileData
): Promise<AxiosResponse> =>
  API.get("/transaction/history", { params: profileData });