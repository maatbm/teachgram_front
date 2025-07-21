import { PostService } from "services/postService/post.service";
import { useState, useEffect, useCallback } from "react";
import type { PostResponse } from "services/postService/post.types";
import { useAuth } from "contexts/AuthContext";

export function useProfile() {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadMorePosts = useCallback(async () => {
        if (!user) return;
        try {
            const response = await PostService.getUserPosts(user.id, page, 9);
            if ("posts" in response) {
                const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
                setPosts(prevPosts => [...prevPosts, ...validPosts]);
                setPage(prevPage => prevPage + 1);
                setTotalPages(response.totalPages);
            } else {
                setError(response.message);
            }
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro ao buscar mais posts.");
        }
    }, [loading, page, totalPages, user]);

    useEffect(() => {
        const fetchInitialPosts = async () => {
            if (!user) {
                setLoading(false);
                return;
            };

            setLoading(true);
            setError("");
            setPosts([]);
            setPage(0);

            try {
                const response = await PostService.getUserPosts(user.id, 0, 9);
                if ("posts" in response) {
                    const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
                    setPosts(validPosts);
                    setPage(1);
                    setTotalPages(response.totalPages);
                } else {
                    setError(response.message);
                }
            } catch (err: any) {
                setError(err.message || "Ocorreu um erro ao buscar os posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialPosts();
    }, [user]);

    const hasMore = !loading && page < totalPages;

    return { posts, loadMorePosts, loading, error, hasMore };
}