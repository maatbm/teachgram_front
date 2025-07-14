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

interface SignUpResponse {
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

export class UserService {
  static async signup(request: SignUpRequest): Promise<SignUpResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signup", request);
      return response.data as SignUpResponse;
    } catch (error) {
        return errorHandler(error);
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
