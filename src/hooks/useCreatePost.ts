import { useState } from "react";
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

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }

    async function createPost() {
        setLoading(true)
        setError("");
        const response = await PostService.createPost(post);
        if ("id" in response) {
            navigate("/", { replace: true });
        } else {
            setError(response.message);
        }
    }

    return { handleInput, createPost, loading, error, post }
}