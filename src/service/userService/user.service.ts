import { API } from "../API";
import axios from "axios";
import * as UserTypes from "./user.types";

export class UserService {
  static async signup(request: UserTypes.SignUpRequest): Promise<UserTypes.UserResponse | UserTypes.ErrorResponse> {
    try {
      const response = await API.post("/user/signup", request);
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async signin(request: UserTypes.SignInRequest): Promise<UserTypes.JwtTokenResponse | UserTypes.ErrorResponse> {
    try {
      const response = await API.post("/user/signin", request);
      return response.data as UserTypes.JwtTokenResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async getAllNonDeletedUsers(page: number, size: number): Promise<UserTypes.AllNonDeletedUsersResponse | UserTypes.ErrorResponse> {
    try {
      const response = await API.get("/user/all", {
        params: { page, size },
      });
      return response.data as UserTypes.AllNonDeletedUsersResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async getUserProfile(): Promise<UserTypes.UserResponse | UserTypes.ErrorResponse> {
    try {
      const response = await API.get("/user/profile");
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async updateUserprofile(request: UserTypes.UpdateUserProfileRequest): Promise<UserTypes.UserResponse | UserTypes.ErrorResponse> {
    try {
      const response = await API.patch("/user", request);
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async deleteUserProfile(): Promise<UserTypes.ErrorResponse | void> {
    try {
      await API.delete("/user");
    } catch (error) {
      return errorHandler(error);
    }
  }
}

function errorHandler(error: any): UserTypes.ErrorResponse {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data as UserTypes.ErrorResponse;
  }
  return {
    status: "Error",
    message: "An unexpected error occurred",
  } as UserTypes.ErrorResponse;
}
