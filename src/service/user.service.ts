import { API } from "./API";
import axios from "axios";

interface SignUpRequest {
  name: string;
  mail: string;
  username: string;
  description: string;
  phone: string;
  password: string;
  profileLink: string;
}

interface UserResponse {
  id: number;
  name: string;
  mail: string;
  username: string;
  description: string;
  phone: string;
  profileLink: string;
}

interface ErrorResponse {
  status: string;
  message: string;
}

interface SignInRequest {
  mail: string;
  password: string;
}

interface JwtTokenResponse {
  type: string;
  token: string;
  expiration: number;
}

interface AllNonDeletedUsersResponse {
  users: UserResponse[];
  totalItems: number;
  totalPages: number;
}

interface UpdateUserProfileRequest {
  name: string | null;
  mail: string | null;
  username: string | null;
  description: string | null;
  phone: string | null;
  password: string | null;
  profileLink: string | null;
}

export class UserService {
  static async signup(request: SignUpRequest): Promise<UserResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signup", request);
      return response.data as UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async signin(request: SignInRequest): Promise<JwtTokenResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signin", request);
      return response.data as JwtTokenResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async getAllNonDeletedUsers(page: number, size: number): Promise<AllNonDeletedUsersResponse | ErrorResponse> {
    try {
      const response = await API.get("/user/all", {
        params: { page, size },
      });
      return response.data as AllNonDeletedUsersResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async getUserProfile(): Promise<UserResponse | ErrorResponse> {
    try {
      const response = await API.get("/user/profile");
      return response.data as UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async updateUserprofile(request: UpdateUserProfileRequest): Promise<UserResponse | ErrorResponse> {
    try {
      const response = await API.patch("/user", request);
      return response.data as UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

}

function errorHandler(error: any): ErrorResponse {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data as ErrorResponse;
  }
  return {
    status: "Error",
    message: "An unexpected error occurred",
  } as ErrorResponse;
}
