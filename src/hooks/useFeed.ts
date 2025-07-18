import { useState, useEffect } from "react";
import * as PostTypes from "services/postService/post.types";
import { PostService } from "services/postService/post.service";

export function useFeed() {
    const [posts, setPosts] = useState<PostTypes.PostResponse[]>([]);
    const [page, setPage] = useState<number>(0);

    async function getPosts() {
        const response = await PostService.getFeedposts(page, 5);
        if ("posts" in response) {
            setPosts(prevPosts => [...prevPosts, ...response.posts]);
            if (page < response.totalPages) {
                setPage(prevPage => prevPage + 1);
            }
        }
    }

    async function likePost(postId: number) {
        const response = await PostService.likePost(postId);
        if (typeof response === "number") {
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, likes: response } : post
                )
            );
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return { getPosts, posts, likePost};
}