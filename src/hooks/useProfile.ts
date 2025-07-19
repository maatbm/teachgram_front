import { PostService } from "services/postService/post.service";
import { useState, useEffect } from "react";
import type { PostResponse } from "services/postService/post.types";
import { type UserResponse } from "services/userService/user.types";
import { UserService } from "services/userService/user.service";

export function useProfile() {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const [user, setUser] = useState<UserResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    async function getUserPosts(userId: number) {
        const response = await PostService.getUserPosts(userId, page, 9);
        if ("posts" in response) {
            const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
            setPosts(prevPosts => [...prevPosts, ...validPosts]);
            setTotalPages(response.totalPages);
            setTotalPosts(response.totalItems);
            if (page < response.totalPages - 1) {
                setPage(prevPage => prevPage + 1);
            }
        }
    }

    async function getUser() {
        try {
            const response = await UserService.getAuthenticatedUserProfile();
            if ("id" in response) {
                setUser(response);
            } else {
                setError(response.message);
                console.log(response.message)
            }
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        async function fetchPosts() {
            if (user) {
                setLoading(true);
                await getUserPosts(user.id);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        fetchPosts();
    }, [user]);

    const hasMore = page < totalPages - 1;
    return { user, posts, getUserPosts, loading, error, hasMore, totalPosts }
}