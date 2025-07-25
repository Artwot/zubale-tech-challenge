import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Post } from '../../types';
import { Button, Icon, Text } from '../atoms';
import { FeedList } from '../organisms';

export interface FeedTemplateProps {
  posts: Post[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onSharePress?: (postId: string) => void;
  onSavePress?: (postId: string) => void;
  onNamePress?: (postId: string) => void;
  onImagePress?: (postId: string) => void;
  onRetryPress?: () => void;
}

/**
 * Template component that provides the complete feed layout
 * Follows Atomic Design principles for template composition
 */
export const FeedTemplate: React.FC<FeedTemplateProps> = ({
  posts,
  loading = false,
  error = null,
  onRefresh,
  onLoadMore,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
  onNamePress,
  onImagePress,
  onRetryPress,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
  }, [onRefresh]);

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text
          variant="title"
          weight="bold"
          color="primary"
          align="left"
          style={{
            fontFamily: 'DancingScript_700Bold',
            fontSize: 32,
          }}
        >
          Instagram
        </Text>
        <View style={styles.headerIcons}>
          <Icon
            name="heartOutline"
            size="lg"
            color="primary"
            style={styles.headerIcon}
          />
          <Icon name="message" size="lg" color="primary" />
        </View>
      </View>
    ),
    []
  );

  const renderErrorState = useCallback(
    () => (
      <View style={styles.errorContainer}>
        <Text
          variant="body"
          color="error"
          align="center"
          style={styles.errorText}
        >
          {error}
        </Text>
        <Text
          variant="caption"
          color="secondary"
          align="center"
          style={styles.errorSubtext}
        >
          Something went wrong. Please try again.
        </Text>
        {onRetryPress && (
          <Button
            title="Retry"
            variant="primary"
            size="md"
            onPress={onRetryPress}
            style={styles.retryButton}
          />
        )}
      </View>
    ),
    [error, onRetryPress]
  );

  if (error && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {renderHeader()}
        {renderErrorState()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}
      <FeedList
        posts={posts}
        loading={loading}
        refreshing={refreshing}
        error={error}
        onRefresh={handleRefresh}
        onLoadMore={onLoadMore}
        onLikePress={onLikePress}
        onCommentPress={onCommentPress}
        onSharePress={onSharePress}
        onSavePress={onSavePress}
        onNamePress={onNamePress}
        onImagePress={onImagePress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginHorizontal: 4,
  },
  subtitle: {
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  errorText: {
    marginBottom: 8,
  },
  errorSubtext: {
    marginBottom: 24,
  },
  retryButton: {
    minWidth: 120,
  },
});
