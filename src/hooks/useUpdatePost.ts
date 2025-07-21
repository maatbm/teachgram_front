import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PostService } from "services/postService/post.service";
import type { UpdatePostRequest } from "services/postService/post.types";

export function useUpdatePost(initialPost: UpdatePostRequest = {}) {
    const [post, setPost] = useState<UpdatePostRequest>(initialPost);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handlePrivacy = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPost((prev) => ({ ...prev, [name]: checked }));
    }, []);

    const updatePost = useCallback(async (postId: number) => {
        setError("");
        setLoading(true);
        try {
            const response = await PostService.updatePost(postId, post);
            if ("id" in response) {
                navigate("/", { replace: true });
            } else {
                setError(response.message);
            }
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro ao atualizar o post.");
        } finally {
            setLoading(false);
        }
    }, [post, navigate]);

    const deletePost = useCallback(async (postId: number) => {
        setError("");
        setLoading(true);
        try {
            await PostService.deletePost(postId);
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro ao deletar o post.");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    return { 
        post,
        updatePost, 
        loading, 
        error, 
        handleInput,      
        handlePrivacy,
        deletePost 
    };
}