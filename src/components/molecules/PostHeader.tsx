import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from '../atoms';

export interface PostHeaderProps {
  avatar: string;
  name: string;
  location?: string;
  onPress?: () => void;
}

/**
 * Molecular PostHeader component combining Text and Image atoms
 * Displays user avatar, name, and location
 * Follows Atomic Design principles for composition
 */
export const PostHeader: React.FC<PostHeaderProps> = ({
  avatar,
  name,
  location,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={avatar} size="md" shape="circle" fallbackText="User" />
      </View>

      <View style={styles.infoContainer}>
        <Text variant="body" weight="semibold" color="primary">
          {name}
        </Text>
        {location && (
          <Text variant="caption" color="secondary">
            {location}
          </Text>
        )}
      </View>

      {onPress && (
        <View style={styles.moreContainer}>
          <Text variant="caption" color="tertiary">
            •••
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  moreContainer: {
    paddingHorizontal: 8,
  },
});
