import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Post } from '../../types';
import { Text } from '../atoms';
import { PostCard } from './PostCard';

export interface FeedListProps {
  posts: Post[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onSharePress?: (postId: string) => void;
  onSavePress?: (postId: string) => void;
  onNamePress?: (postId: string) => void;
  onImagePress?: (postId: string) => void;
}

/**
 * Organism component that handles the feed list with optimized performance
 * Follows Atomic Design principles for component composition
 */
export const FeedList: React.FC<FeedListProps> = ({
  posts,
  loading = false,
  refreshing = false,
  error = null,
  onRefresh,
  onLoadMore,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
  onNamePress,
  onImagePress,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && onLoadMore) {
      setIsLoadingMore(true);
      onLoadMore();
      setTimeout(() => setIsLoadingMore(false), 1000);
    }
  }, [isLoadingMore, onLoadMore]);

  const renderPost = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard
        post={item}
        onLikePress={onLikePress}
        onCommentPress={onCommentPress}
        onSharePress={onSharePress}
        onSavePress={onSavePress}
        onNamePress={onNamePress}
        onImagePress={onImagePress}
      />
    ),
    [
      onLikePress,
      onCommentPress,
      onSharePress,
      onSavePress,
      onNamePress,
      onImagePress,
    ]
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text variant="caption" color="secondary" style={styles.loadingText}>
          Loading more posts...
        </Text>
      </View>
    );
  }, [isLoadingMore]);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text variant="body" color="secondary" style={styles.emptyText}>
            Loading posts...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text variant="body" color="error" style={styles.errorText}>
            {error}
          </Text>
          <Text variant="caption" color="secondary" style={styles.errorSubtext}>
            Pull down to refresh
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text variant="body" color="secondary" style={styles.emptyText}>
          No posts available
        </Text>
        <Text variant="caption" color="tertiary" style={styles.emptySubtext}>
          Pull down to refresh
        </Text>
      </View>
    );
  }, [loading, error]);

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialNumToRender={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  contentContainer: {
    flexGrow: 1,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingText: {
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    textAlign: 'center',
  },
});
