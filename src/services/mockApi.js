import { initialPosts } from './mockData';

// Helper to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Database Helpers (LocalStorage) ---
const getDB = (key, defaultVal) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

const setDB = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};

// Initialize DB if empty
if (!localStorage.getItem('mock_posts')) {
    setDB('mock_posts', initialPosts);
}
if (!localStorage.getItem('mock_users')) {
    setDB('mock_users', []);
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// --- API Service Implementations ---
export const mockAuthService = {
    login: async (email, password) => {
        await delay(600); // 600ms network delay

        const users = getDB('mock_users', []);
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Create a fake token
            const token = `fake-jwt-token-${user._id}`;
            // Remove password from response
            const { password, ...userWithoutPassword } = user;

            return {
                data: {
                    success: true,
                    user: userWithoutPassword,
                    token
                }
            };
        } else {
            throw { response: { data: { message: "Invalid email or password" } } };
        }
    },

    register: async (username, email, password) => {
        await delay(800);

        const users = getDB('mock_users', []);
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            throw { response: { data: { message: "User with this email already exists" } } };
        }

        const newUser = {
            _id: `user_${generateId()}`,
            username,
            email,
            password // In a real app never store passwords in plain text!
        };

        users.push(newUser);
        setDB('mock_users', users);

        return {
            data: {
                success: true,
                message: "Registration successful"
            }
        };
    }
};

export const mockPostService = {
    getPosts: async () => {
        await delay(500);
        const posts = getDB('mock_posts', []);
        // Sort descending by created date
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return { data: { success: true, data: posts } };
    },

    createPost: async (postData) => {
        await delay(600);

        // We need to know who is creating the post. Since this is a mock, 
        // we assume the currently logged-in user from AuthContext (saved in localStorage by App)
        const currentUserStr = localStorage.getItem('user');
        const currentUser = currentUserStr ? JSON.parse(currentUserStr) : { _id: "user_unknown", username: "Anonymous" };

        const posts = getDB('mock_posts', []);
        const newPost = {
            _id: `post_${generateId()}`,
            title: postData.title,
            content: postData.content,
            tags: postData.tags || [],
            status: "published",
            author: {
                _id: currentUser._id,
                username: currentUser.username
            },
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        posts.unshift(newPost); // Add to beginning
        setDB('mock_posts', posts);

        return { data: { success: true, data: newPost } };
    },

    likePost: async (postId) => {
        await delay(300);

        const currentUserStr = localStorage.getItem('user');
        if (!currentUserStr) throw { response: { data: { message: "Unauthorized" } } };

        const currentUser = JSON.parse(currentUserStr);
        const posts = getDB('mock_posts', []);

        const postIndex = posts.findIndex(p => p._id === postId);
        if (postIndex === -1) throw { response: { data: { message: "Post not found" } } };

        const post = posts[postIndex];
        const userLikeIndex = post.likes.indexOf(currentUser._id);

        if (userLikeIndex > -1) {
            // Unlike
            post.likes.splice(userLikeIndex, 1);
        } else {
            // Like
            post.likes.push(currentUser._id);
        }

        setDB('mock_posts', posts);

        return { data: { success: true, message: "Like updated successfully", data: post.likes } };
    },

    addComment: async (postId, content) => {
        await delay(400);

        const currentUserStr = localStorage.getItem('user');
        if (!currentUserStr) throw { response: { data: { message: "Unauthorized" } } };

        const currentUser = JSON.parse(currentUserStr);
        const posts = getDB('mock_posts', []);

        const postIndex = posts.findIndex(p => p._id === postId);
        if (postIndex === -1) throw { response: { data: { message: "Post not found" } } };

        const post = posts[postIndex];
        const newComment = {
            _id: `comment_${generateId()}`,
            content: content.content, // passed as { content: 'text' } from hook
            author: {
                _id: currentUser._id,
                username: currentUser.username
            },
            createdAt: new Date().toISOString()
        };

        post.comments.push(newComment);
        setDB('mock_posts', posts);

        return { data: { success: true, data: newComment } };
    }
};
