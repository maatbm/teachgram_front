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
    const [hasMore, setHasMore] = useState(true);

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

    const getPosts = useCallback(async () => {
        if (page >= totalPages) {
            setHasMore(false);
            return;
        }

        const response = await PostService.getUserPosts(userId, page, 9);
        if ("posts" in response) {
            const validPosts = response.posts.filter(post => post.photoLink || post.videoLink);
            setPosts(prevPosts => [...prevPosts, ...validPosts]);
            setPage(prevPage => prevPage + 1);
            setTotalPages(response.totalPages);
        }
    }, [userId, page, totalPages]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            setPosts([]);
            setPage(0);
            setHasMore(true);

            const userResponse = await UserService.getUserProfileById(userId);
            if ("id" in userResponse) {
                setUser(userResponse);
            }

            const postResponse = await PostService.getUserPosts(userId, 0, 9);
            if ("posts" in postResponse) {
                const validPosts = postResponse.posts.filter(post => post.photoLink || post.videoLink);
                setPosts(validPosts); 
                setPage(1);
                setTotalPages(postResponse.totalPages);
                if (1 >= postResponse.totalPages) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }

            setLoading(false);
        };

        fetchInitialData();
    }, [userId]);

    return { user, posts, loading, getPosts, hasMore, addFriend }
}