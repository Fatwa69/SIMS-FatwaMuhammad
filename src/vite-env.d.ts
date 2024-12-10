/// <reference types="vite/client" />
//cakaran interface type
interface ApiResponse<T = any> {
  status: string;
  message: string;
  data: T;
}

interface UserData {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

interface ProfileData {
  [key: string]: any;
}

interface UserResponse {
  message: string;
  token: string;
  user: User;
}

// TopupData interface for top-up
interface TopupData {
  top_up_amount: number; // Amount to be topped up
  // Add any other properties required for top-up
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: string;
  created_at: string;
}

interface TransactionPayload {
  data: Transaction[];
  offset: number;
  limit: number;
}

interface UserSliceState {
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  message: string | null;
  token: string | null;
  user: User | null;
}

interface ProfileSliceState {
  transaction: any;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  message: string | null;
  data: ProfileData | null;
  balance: number | null;
  services: Service[] | null;
  banner: Banner[] | null;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}


interface Banner {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface RootState {
  user: UserSliceState;
  profile: ProfileSliceState;
}
