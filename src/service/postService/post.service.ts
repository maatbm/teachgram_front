import { API } from "../API";
import { ErrorHandler, type ErrorResponse } from "../ErrorHandler";
import * as PostTypes from "./post.types";

export class PostService {
    static async createPost(request: PostTypes.CreatePostRequest): Promise<PostTypes.PostResponse | ErrorResponse> {
        try {
            const response = await API.post("/post", request);
            return response.data as PostTypes.PostResponse;
        } catch (error) {
            return ErrorHandler(error);
        }
    }
}
