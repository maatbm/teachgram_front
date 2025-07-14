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
    photoLink: string | null;
    videoLink: string | null;
    isPrivate: boolean;
    likes: number;
    createdAt: string;
}

