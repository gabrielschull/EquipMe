import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../types/message.type";

interface Conversation {
    [conversationId: string]: Message[]
}

const initialState: Conversation = {};


export const MessageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (_, action) => {
      return action.payload;
    },
    addMessage: (state, action) => {
        const {conversationId} = action.payload;
        if (!state[conversationId]) {
            state[conversationId] = [];
        }
        state[conversationId].push(action.payload);
    },
  },
});

export const {
    setMessages,
    addMessage,
  } = MessageSlice.actions;
  export default MessageSlice.reducer;
  
