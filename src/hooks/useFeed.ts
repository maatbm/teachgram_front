import { useState, useEffect, useCallback } from "react";
import * as PostTypes from "services/postService/post.types";
import { PostService } from "services/postService/post.service";

export function useFeed() {
    const [posts, setPosts] = useState<PostTypes.PostResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState(0);

    const getPosts = useCallback(async () => {
        const response = await PostService.getFeedposts(page, 5);
        if ("posts" in response) {
            setPosts(prevPosts => [...prevPosts, ...response.posts]);
            setTotalPages(response.totalPages);
            setPage(prevPage => prevPage + 1);
        }
    }, [page, totalPages]);

    const likePost = useCallback(async (postId: number) => {
        const response = await PostService.likePost(postId);
        if (typeof response === "number") {
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, likes: response } : post
                )
            );
        }
    }, []);

    useEffect(() => {
        getPosts();
    }, []);

    const hasMore = page < totalPages;
    return { getPosts, posts, likePost, hasMore};
}