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

    static async getFeedposts(page: number, size: number): Promise<PostTypes.PagePostsResponse | ErrorResponse> {
        try {
            const response = await API.get("/post/feed", { params: { page, size } });
            return response.data as PostTypes.PagePostsResponse;
        } catch (error) {
            return ErrorHandler(error);
        }
    }

    static async getUserPosts(userId: number, page: number, size: number): Promise<PostTypes.PagePostsResponse | ErrorResponse> {
        try {
            const response = await API.get(`/post/user/${userId}`, { params: { page, size } });
            return response.data as PostTypes.PagePostsResponse;
        } catch (error) {
            return ErrorHandler(error);
        }
    }
}
