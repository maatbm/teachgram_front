import { useState, useEffect } from "react";
import { PostService } from "services/postService/post.service";
import { type PostResponse } from "services/postService/post.types";
import { UserService } from "services/userService/user.service";
import type { UserResponse } from "services/userService/user.types";

export function useOtherProfile(userId: number) {
    const [user, setUser] = useState<UserResponse>();
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        const response = await UserService.getUserProfileById(userId);
        if ("id" in response) {
            setUser(response);
        }
    }

    async function getPosts() {
        const response = await PostService.getUserPosts(userId, page, 9);
        if ("posts" in response) {
            const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
            setPosts(prevPosts => [...prevPosts, ...validPosts]);
            setTotalPages(response.totalPages);
            if (page < response.totalPages - 1) {
                setPage(prevPage => prevPage + 1);
            }
        }
    }

    useEffect(() => {
        getUser();
        getPosts();
        setLoading(false);
    }, []);

    const hasMore = page < totalPages;

    return { user, posts, loading, getPosts, hasMore }
}