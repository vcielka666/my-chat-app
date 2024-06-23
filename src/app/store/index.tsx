"use client";
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

interface Message {
  user: string;
  text: string;
  date: string;
}

interface State {
  messages: Message[];
  users: string[];
  typingUsers: { [key: string]: string };
}

type Action =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_USERS'; payload: string[] }
  | { type: 'ADD_USER'; payload: string }
  | { type: 'REMOVE_USER'; payload: string }
  | { type: 'SET_TYPING'; payload: { user: string, text: string } };

const initialState: State = {
  messages: [],
  users: [],
  typingUsers: {}
};

const ChatContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Adding message to state:', action.payload);
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'REMOVE_USER':
      return { ...state, users: state.users.filter(user => user !== action.payload) };
    case 'SET_TYPING':
      return {
        ...state,
        typingUsers: { ...state.typingUsers, [action.payload.user]: action.payload.text }
      };
    default:
      return state;
  }
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
