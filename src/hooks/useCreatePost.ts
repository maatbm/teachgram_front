import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostService } from "services/postService/post.service";
import { type CreatePostRequest } from "services/postService/post.types";

const INITIAL_POST_STATE: CreatePostRequest = {
    title: "",
    description: "",
    photoLink: null,
    videoLink: null,
    isPrivate: false
}

export function useCreatePost() {
    const [post, setPost] = useState<CreatePostRequest>(INITIAL_POST_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handlePrivacity = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setPost((prev) => ({ ...prev, [name]: checked }));
    }, []);

    async function createPost() {
        setLoading(true)
        setError("");
        const response = await PostService.createPost(post);
        if ("id" in response) {
            console.log("post criado com sucesso")
            navigate("/", { replace: true });
        } else {
            setError(response.message);
            alert(response.message);
        }
        setLoading(false);
    }

    return { handleInput, handlePrivacity, createPost, loading, error, post }
}