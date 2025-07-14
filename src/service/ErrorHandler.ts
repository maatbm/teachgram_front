import axios from "axios";

export interface ErrorResponse {
    status: string;
    message: string;
}

export function ErrorHandler(error: any): ErrorResponse {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ErrorResponse;
    }
    return {
        status: "Error",
        message: "An unexpected error occurred",
    } as ErrorResponse;
}