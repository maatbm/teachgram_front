import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostService } from "services/postService/post.service";
import type { UpdatePostRequest } from "services/postService/post.types";

export function useUpdatePost() {
    const [post, setPost] = useState<UpdatePostRequest>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }

    function handlePrivacy(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;
        setPost((prev) => ({ ...prev, [name]: checked }));
    }

    async function updatePost(postId: number) {
        setError("");
        setLoading(true)
        const response = await PostService.updatePost(postId, post);
        if ("id" in response) {
            navigate("/", { replace: true })
        } else {
            setError(response.message);
        }
        setLoading(false);
    }

    async function deletePost(postId: number) {
        try {
            setLoading(true);
            await PostService.deletePost(postId);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false)
        }
    }

    return { updatePost, loading, error, handleInput, handlePrivacy, deletePost }
}