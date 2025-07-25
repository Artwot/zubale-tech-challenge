import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../atoms';

export interface PostActionsProps {
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onSavePress?: () => void;
}

/**
 * Molecular PostActions component combining Text and Icon atoms
 * Displays like, comment, share, and save actions
 * Follows Atomic Design principles for composition
 */
export const PostActions: React.FC<PostActionsProps> = ({
  likes,
  comments,
  liked,
  saved,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLikePress}
          activeOpacity={0.7}
        >
          <Icon
            name={liked ? 'heart' : 'heartOutline'}
            size="lg"
            color={liked ? 'error' : 'primary'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCommentPress}
          activeOpacity={0.7}
        >
          <Icon name="comment" size="lg" color="primary" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onSharePress}
          activeOpacity={0.7}
        >
          <Icon name="share" size="lg" color="primary" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onSavePress}
        activeOpacity={0.7}
      >
        <Icon
          name={saved ? 'bookmark' : 'bookmarkOutline'}
          size="lg"
          color={saved ? 'primary' : 'primary'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
