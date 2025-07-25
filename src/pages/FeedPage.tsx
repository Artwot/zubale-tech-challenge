import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { FeedTemplate } from '../components/templates';
import { useAppContext } from '../context';
import { apiService } from '../services';
import { Post } from '../types';

export const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAppContext();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getPosts();

      if (response.success && response.data) {
        const validPosts = response.data.filter((post: any) => {
          return post.id && post.name && post.image && post.avatar;
        });

        setPosts(validPosts);

        dispatch({ type: 'SET_POSTS', payload: validPosts });
      } else {
        throw new Error(response.message || 'Failed to fetch posts');
      }
    } catch (err: any) {
      const errorMessage =
        err.message || 'An error occurred while fetching posts';
      setError(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    await fetchPosts();
  }, [fetchPosts]);

  const handleLoadMore = useCallback(async () => {
    // For now, we'll just refetch the same data
    // In a real app, you'd implement pagination
    await fetchPosts();
  }, [fetchPosts]);

  const handleLikePress = useCallback(
    (postId: string) => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      dispatch({
        type: 'TOGGLE_LIKE',
        payload: postId,
      });
    },
    [posts, dispatch]
  );

  const handleSavePress = useCallback(
    (postId: string) => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, saved: !post.saved } : post
        )
      );

      dispatch({
        type: 'TOGGLE_SAVE',
        payload: postId,
      });
    },
    [posts, dispatch]
  );

  const handleCommentPress = useCallback((postId: string) => {
    Alert.alert('Comments', `Comments for post ${postId}`, [{ text: 'OK' }]);
  }, []);

  const handleSharePress = useCallback((postId: string) => {
    Alert.alert('Share', `Share post ${postId}`, [{ text: 'OK' }]);
  }, []);

  const handleNamePress = useCallback((postId: string) => {
    Alert.alert('User Profile', `View profile for post ${postId}`, [
      { text: 'OK' },
    ]);
  }, []);

  const handleImagePress = useCallback((postId: string) => {
    Alert.alert('View Image', `View full image for post ${postId}`, [
      { text: 'OK' },
    ]);
  }, []);

  const handleRetryPress = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <FeedTemplate
      posts={posts}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
      onLoadMore={handleLoadMore}
      onLikePress={handleLikePress}
      onCommentPress={handleCommentPress}
      onSharePress={handleSharePress}
      onSavePress={handleSavePress}
      onNamePress={handleNamePress}
      onImagePress={handleImagePress}
      onRetryPress={handleRetryPress}
    />
  );
};
