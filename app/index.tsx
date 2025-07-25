import React from 'react';
import { AppProvider } from '../src/context/AppContext';
import { FeedPage } from '../src/pages';

export default function HomePage() {
  return (
    <AppProvider>
      <FeedPage />
    </AppProvider>
  );
}
