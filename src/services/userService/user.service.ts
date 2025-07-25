import { API } from "../API";
import { ErrorHandler, type ErrorResponse } from "../ErrorHandler";
import * as UserTypes from "./user.types";

export class UserService {
  static async signup(request: UserTypes.SignUpRequest): Promise<UserTypes.UserResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signup", request);
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async signin(request: UserTypes.SignInRequest): Promise<UserTypes.JwtTokenResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signin", request);
      return response.data as UserTypes.JwtTokenResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async getAllNonDeletedUsers(page: number, size: number): Promise<UserTypes.AllNonDeletedUsersResponse | ErrorResponse> {
    try {
      const response = await API.get("/user/all", {
        params: { page, size },
      });
      return response.data as UserTypes.AllNonDeletedUsersResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async getUserProfileById(userId: number): Promise<UserTypes.UserResponse | ErrorResponse> {
    try {
      const response = await API.get(`/user/profile/${userId}`);
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async getAuthenticatedUserProfile(): Promise<UserTypes.UserResponse | ErrorResponse> {
    try {
      const response = await API.get("/user/profile");
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async updateUserprofile(request: UserTypes.UpdateUserProfileRequest): Promise<UserTypes.UserResponse | ErrorResponse> {
    try {
      const response = await API.patch("/user", request);
      return response.data as UserTypes.UserResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async deleteUserProfile(): Promise<ErrorResponse | void> {
    try {
      await API.delete("/user");
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async addFriend(friendId: number): Promise<ErrorResponse | void> {
    try {
      await API.post(`/friendship/add/${friendId}`);
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async removeFriend(friendId: number): Promise<ErrorResponse | void> {
    try {
      await API.delete(`/friendship/${friendId}`);
    } catch (error) {
      return ErrorHandler(error);
    }
  }

  static async getFriends(page: number, size: number): Promise<UserTypes.AllNonDeletedUsersResponse | ErrorResponse> {
    try {
      const response = await API.get("/user/friends", { params: { page, size } });
      return response.data as UserTypes.AllNonDeletedUsersResponse;
    } catch (error) {
      return ErrorHandler(error);
    }
  }
}
