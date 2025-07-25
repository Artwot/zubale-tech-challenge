import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Post } from '../../types';
import { Image } from '../atoms';
import { PostActions, PostFooter, PostHeader } from '../molecules';

export interface PostCardProps {
  post: Post;
  onLikePress?: (postId: string) => void;
  onCommentPress?: (postId: string) => void;
  onSharePress?: (postId: string) => void;
  onSavePress?: (postId: string) => void;
  onNamePress?: (postId: string) => void;
  onImagePress?: (postId: string) => void;
}

/**
 * Organism component that combines all molecular components to display a complete post
 * Follows Atomic Design principles for component composition
 */
export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
  onNamePress,
  onImagePress,
}) => {
  const handleLikePress = () => {
    onLikePress?.(post.id);
  };

  const handleCommentPress = () => {
    onCommentPress?.(post.id);
  };

  const handleSharePress = () => {
    onSharePress?.(post.id);
  };

  const handleSavePress = () => {
    onSavePress?.(post.id);
  };

  const handleNamePress = () => {
    onNamePress?.(post.id);
  };

  const handleImagePress = () => {
    onImagePress?.(post.id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <PostHeader
        avatar={post.avatar}
        name={post.name}
        location={post.location}
      />

      {/* Post Image */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePress}
        activeOpacity={0.9}
      >
        <Image
          source={post.image}
          size="xl"
          shape="square"
          fallbackText="Post Image"
          showError={true}
        />
      </TouchableOpacity>

      {/* Actions */}
      <PostActions
        likes={post.likes}
        comments={post.comments}
        liked={post.liked}
        saved={post.saved}
        onLikePress={handleLikePress}
        onCommentPress={handleCommentPress}
        onSharePress={handleSharePress}
        onSavePress={handleSavePress}
      />

      {/* Footer */}
      <PostFooter
        name={post.name}
        description={post.description}
        likes={post.likes}
        comments={post.comments}
        createdAt={post.createdAt}
        onNamePress={handleNamePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Square aspect ratio for post images
  },
});
