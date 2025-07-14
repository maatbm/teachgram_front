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

interface SignInRequest {
  mail: string;
  password: string;
}

interface JwtTokenResponse {
  type: string;
  token: string;
  expiration: number;
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

  static async signin(request: SignInRequest): Promise<JwtTokenResponse | ErrorResponse> {
    try {
      const response = await API.post("/user/signin", request);
      return response.data as JwtTokenResponse;
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
