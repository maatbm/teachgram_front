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
            const response = await API.get(`/post/profile/${userId}`, { params: { page, size } });
            return response.data as PostTypes.PagePostsResponse;
        } catch (error) {
            return ErrorHandler(error);
        }
    }

    static async likePost(postId: number): Promise<number | ErrorResponse> {
        try {
            const response = await API.patch(`/post/like/${postId}`);
            return response.data as number
        } catch (error) {
            return ErrorHandler(error);
        }
    }

    static async updatePost(postId: number, request: PostTypes.UpdatePostRequest): Promise<PostTypes.PostResponse | ErrorResponse> {
        try {
            const response = await API.patch(`/post/${postId}`, request);
            return response.data as PostTypes.PostResponse;
        } catch (error) {
            return ErrorHandler(error);
        }
    }

    static async deletePost(postId: number): Promise<void | ErrorResponse> {
        try {
            await API.delete(`/post/${postId}`);
        } catch (error) {
            return ErrorHandler(error);
        }
    }
}
