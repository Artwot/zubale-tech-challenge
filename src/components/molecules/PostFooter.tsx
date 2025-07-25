import { formatRelativeTime } from '@/src/utils/dateUtils';
import { formatComments, formatLikes } from '@/src/utils/numberUtils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../atoms';

export interface PostFooterProps {
  name: string;
  description: string;
  likes: number;
  comments: number;
  createdAt: string;
  onNamePress?: () => void;
  onDescriptionPress?: () => void;
}

/**
 * Molecular PostFooter component combining Text atoms
 * Displays post description, likes, comments, and formatted date
 * Follows Atomic Design principles for composition
 */
export const PostFooter: React.FC<PostFooterProps> = ({
  name,
  description,
  likes,
  comments,
  createdAt,
  onNamePress,
  onDescriptionPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Likes count */}
      <Text
        variant="body"
        weight="semibold"
        color="primary"
        style={styles.likes}
      >
        {formatLikes(likes)} likes
      </Text>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text
          variant="body"
          weight="semibold"
          color="primary"
          style={styles.name}
        >
          {name}
        </Text>
        <Text variant="body" color="primary" style={styles.description}>
          {' '}
          {description}
        </Text>
      </View>

      {/* Comments preview */}
      {comments > 0 && (
        <Text variant="caption" color="secondary" style={styles.comments}>
          View all {formatComments(comments)} comments
        </Text>
      )}

      {/* Date */}
      <Text variant="caption" color="tertiary" style={styles.date}>
        {formatRelativeTime(createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 0,
  },
  likes: {
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  name: {
    fontWeight: '600',
  },
  description: {
    flex: 1,
  },
  comments: {
    marginBottom: 4,
  },
  date: {
    marginTop: 4,
  },
});
