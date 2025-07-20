import { useState, useEffect, useCallback } from "react";
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

    const getUser = useCallback(async () => {
        const response = await UserService.getUserProfileById(userId);
        if ("id" in response) {
            setUser(response);
        }
    }, [userId]);

    const getPosts = useCallback(async () => {
        const response = await PostService.getUserPosts(userId, page, 9);
        if ("posts" in response) {
            const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
            setPosts(prevPosts => [...prevPosts, ...validPosts]);
            setTotalPages(response.totalPages);
            if (page < response.totalPages - 1) {
                setPage(prevPage => prevPage + 1);
            }
        }
    }, [userId, page]);

    const addFriend = useCallback(async () => {
        setLoading(true);
        const response = await UserService.addFriend(userId);
        if (response) {
            console.error(response.message);
        } else {
            setUser(prevUser => prevUser ? { ...prevUser, isFriend: true, totalFriends: prevUser.totalFriends + 1 } : undefined);
        }
        setLoading(false);
    }, [userId]);

    useEffect(() => {
        setLoading(true);
        setPosts([]);
        setPage(0);
        setTotalPages(1);

        async function fetchData() {
            await getUser();
            await getPosts();
            setLoading(false);
        }
        fetchData();
    }, [userId, getUser, getPosts]);

    const hasMore = page < totalPages;

    return { user, posts, loading, getPosts, hasMore, addFriend }
}