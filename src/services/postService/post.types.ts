import type { UserResponse } from "services/userService/user.types";

export interface CreatePostRequest {
    title: string;
    description: string;
    photoLink: string | null;
    videoLink: string | null;
    isPrivate: boolean;
}

export interface PostResponse {
    id: number;
    title: string;
    description: string;
    photoLink: string | undefined;
    videoLink: string | undefined;
    isPrivate: boolean;
    user: UserResponse;
    likes: number;
    createdAt: string;
}

export interface PagePostsResponse {
    posts: PostResponse[];
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
}

export interface UpdatePostRequest {
    title?: string;
    description?: string;
    photoLink?: string;
    videoLink?: string;
    isPrivate?: boolean;
}