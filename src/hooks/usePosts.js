import { useState, useEffect } from 'react';
import { postService } from '../services/api';

export const usePosts = (isAuthenticated, user) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await postService.getPosts();
                if (response.data.success) {
                    setPosts(response.data.data);
                } else {
                    setError('Failed to fetch posts');
                }
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchPosts();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const addComment = async (postId, content) => {
        try {
            const response = await postService.addComment(postId, content);
            if (response.data.success) {
                setPosts(prevPosts => prevPosts.map(post =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, response.data.data] }
                        : post
                ));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error posting comment:', err);
            throw new Error('Failed to post comment. Please try again.');
        }
    };

    const likePost = async (postId) => {
        try {
            if (!user?._id) return false;

            const response = await postService.likePost(postId);
            if (response.data.success) {
                setPosts(prevPosts => prevPosts.map(post => {
                    if (post._id === postId) {
                        // Check if user already liked
                        const isLiked = post.likes.includes(user._id);
                        // Toggle like
                        const newLikes = isLiked
                            ? post.likes.filter(id => id !== user._id)
                            : [...post.likes, user._id];

                        return { ...post, likes: newLikes };
                    }
                    return post;
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error liking post:', err);
            throw new Error('Failed to like post. Please try again.');
        }
    };

    const createPost = async (postData) => {
        try {
            const response = await postService.createPost(postData);
            if (response.data.success) {
                setPosts(prevPosts => [response.data.data, ...prevPosts]);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error creating post:', err);
            throw new Error('Failed to create post. Please try again.');
        }
    };

    return {
        posts,
        loading,
        error,
        setError,
        addComment,
        likePost,
        createPost
    };
};
