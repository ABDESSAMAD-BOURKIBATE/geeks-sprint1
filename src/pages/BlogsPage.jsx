import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { formatDate } from '../utils/formatDate';

const BlogsPage = () => {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const { posts, loading, error, setError, addComment, likePost, createPost } = usePosts(isAuthenticated, user);
  
  const [newComment, setNewComment] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [activeSorting, setActiveSorting] = useState('newest');
  
  // New post form state
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [posting, setPosting] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const success = await addComment(postId, newComment);
      if (success) {
        setNewComment('');
        setActiveCommentId(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle like submission
  const handleLike = async (postId) => {
    try {
      await likePost(postId);
    } catch (err) {
      setError(err.message);
    }
  };

  // Sort posts based on active sorting
  const getSortedPosts = () => {
    switch (activeSorting) {
      case 'popular':
        return [...posts].sort((a, b) => b.likes.length - a.likes.length);
      case 'comments':
        return [...posts].sort((a, b) => b.comments.length - a.comments.length);
      case 'newest':
      default:
        return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  // Handle new post submission
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError(null);

    try {
      const tagsArray = newPost.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const success = await createPost({
        title: newPost.title,
        content: newPost.content,
        tags: tagsArray
      });

      if (success) {
        setNewPost({ title: '', content: '', tags: '' });
        setShowNewPostForm(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-36 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Travel Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">Discover amazing destinations, travel tips, and experiences from around Morocco</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-16">
        {/* New Post Section */}
        <div className="max-w-5xl mx-auto mb-8">
          {!showNewPostForm ? (
            <button
              onClick={() => setShowNewPostForm(true)}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">✏️</span>
              Write a New Post
            </button>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleNewPostSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="Enter post title"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="6"
                    required
                    placeholder="Write your post content here..."
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="travel, morocco, adventure"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={posting}
                    className={`px-6 py-2 rounded-lg text-white transition-colors ${
                      posting 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {posting ? 'Posting...' : 'Publish Post'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Sorting Options */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button 
                onClick={() => setActiveSorting('newest')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSorting === 'newest' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Newest
              </button>
              <button 
                onClick={() => setActiveSorting('popular')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSorting === 'popular' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Popular
              </button>
              <button 
                onClick={() => setActiveSorting('comments')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSorting === 'comments' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Most Discussed
              </button>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {getSortedPosts().map(post => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-indigo-500 w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                    {post.author.username.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-indigo-700">{post.author.username}</p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Status */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-4">
                  {/* Like Button */}
                  <button 
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center ${
                      post.likes.includes(user?._id) 
                        ? 'text-red-600' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <span className="text-xl mr-1">❤️</span>
                    <span>{post.likes.length}</span>
                  </button>

                  {/* Comments Button */}
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === post._id ? null : post._id)}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    {post.comments.length} Comments
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentId === post._id && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-bold text-lg mb-4 text-gray-900">Comments</h4>
                    
                    {/* Comment Form */}
                    <div className="mb-6">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all mb-3"
                        rows="3"
                        placeholder="Share your thoughts..."
                      ></textarea>
                      <button 
                        onClick={() => handleCommentSubmit(post._id)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Post Comment
                      </button>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-4">
                      {post.comments.length === 0 ? (
                        <p className="text-gray-500 italic">Be the first to comment!</p>
                      ) : (
                        post.comments.map(comment => (
                          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="rounded-full bg-indigo-500 w-8 h-8 flex items-center justify-center text-white font-bold mr-2">
                                {comment.author.username.charAt(0)}
                              </div>
                              <span className="font-medium mr-2 text-gray-800">{comment.author.username}</span>
                              <span className="text-gray-500 text-sm">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-800">{comment.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
