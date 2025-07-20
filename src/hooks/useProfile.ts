import { PostService } from "services/postService/post.service";
import { useState, useEffect } from "react";
import type { PostResponse } from "services/postService/post.types";
import { useAuth } from "contexts/AuthContext";

export function useProfile() {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const { user } = useAuth();
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
        } else {
            setError(response.message);
        }
    }

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
    return { posts, getUserPosts, loading, error, hasMore, totalPosts }
}