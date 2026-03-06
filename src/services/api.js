import { mockAuthService, mockPostService } from './mockApi';

export const authService = mockAuthService;
export const postService = mockPostService;

// We export a dummy generic api object just in case it is still imported directly somewhere else, though we refactored it
// It won't work for real queries, but it prevents immediate crashes if leftover imports exist
export default {
    get: () => Promise.reject("Mock API used: Use specific services instead"),
    post: () => Promise.reject("Mock API used: Use specific services instead"),
    put: () => Promise.reject("Mock API used: Use specific services instead"),
    delete: () => Promise.reject("Mock API used: Use specific services instead"),
    defaults: { headers: { common: {} } },
    interceptors: { request: { use: () => { } } }
};
