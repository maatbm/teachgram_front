import { useState, useEffect, useCallback } from "react";
import { PostService } from "services/postService/post.service";
import { type PostResponse } from "services/postService/post.types";
import { UserService } from "services/userService/user.service";
import type { UserResponse } from "services/userService/user.types";

export function useOtherProfile(userId: number) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const addFriend = useCallback(async () => {
        const response = await UserService.addFriend(userId);
        if (response) {
            console.error(response.message);
        } else {
            setUser(prevUser => prevUser ? { ...prevUser, isFriend: true, totalFriends: prevUser.totalFriends + 1 } : null);
        }
    }, [userId]);

    const loadMorePosts = useCallback(async () => {
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
            setUser(null);
            setPosts([]);
            setPage(0);

            try {
                const [userResponse, postResponse] = await Promise.all([
                    UserService.getUserProfileById(userId),
                    PostService.getUserPosts(userId, 0, 9)
                ]);

                if ("id" in userResponse) {
                    setUser(userResponse);
                }

                if ("posts" in postResponse) {
                    const validPosts = postResponse.posts.filter(post => post.photoLink || post.videoLink);
                    setPosts(validPosts);
                    setPage(1);
                    setTotalPages(postResponse.totalPages);
                }
            } catch (error) {
                console.error("Failed to fetch user profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [userId]);

    const hasMore = page < totalPages;

    return { user, posts, loading, hasMore, addFriend, loadMorePosts };
}