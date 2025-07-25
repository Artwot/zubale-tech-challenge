import { PostCard } from '@/src/components/organisms/PostCard';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from '../src/components/atoms';

export default function HomePage() {
  const post = {
    id: '1',
    createdAt: '2021-05-15T10:00:00Z',
    name: 'John Doe',
    avatar: 'https://picsum.photos/id/237/200/300',
    description: 'This is a description',
    likes: 10,
    image: 'https://picsum.photos/id/237/600',
    comments: 5,
    liked: true,
    saved: false,
    location: 'New York, NY',
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text variant="title" weight="bold" color="success" align="center">
          🚀 Zubale Tech Challenge
        </Text>
        <Text
          variant="subtitle"
          color="secondary"
          align="center"
          style={styles.subtitle}
        >
          Instagram-like Feed
        </Text>
        <PostCard
          post={post}
          onLikePress={() => {}}
          onCommentPress={() => {}}
          onSharePress={() => {}}
          onSavePress={() => {}}
          onNamePress={() => {}}
          onImagePress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
  },
  info: {
    lineHeight: 24,
  },
});
