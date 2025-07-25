import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Types
export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  liked: boolean;
  saved: boolean;
  location: string;
}

export interface UserInteraction {
  liked: boolean;
  saved: boolean;
}

interface AppState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  userInteractions: Record<string, UserInteraction>;
}

type AppAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'TOGGLE_SAVE'; payload: string }
  | { type: 'SET_USER_INTERACTIONS'; payload: Record<string, UserInteraction> };

// Initial state
const initialState: AppState = {
  posts: [],
  loading: false,
  error: null,
  userInteractions: {},
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        userInteractions: {
          ...state.userInteractions,
          [action.payload]: {
            ...state.userInteractions[action.payload],
            liked: !state.userInteractions[action.payload]?.liked,
          },
        },
      };
    case 'TOGGLE_SAVE':
      return {
        ...state,
        userInteractions: {
          ...state.userInteractions,
          [action.payload]: {
            ...state.userInteractions[action.payload],
            saved: !state.userInteractions[action.payload]?.saved,
          },
        },
      };
    case 'SET_USER_INTERACTIONS':
      return { ...state, userInteractions: action.payload };
    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
