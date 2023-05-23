import { createSlice } from '@reduxjs/toolkit';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {isOpen: false, currentConversationId: ''},
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen
        },
        openChat: (state, action) => {
            
            state.isOpen = true;
            state.currentConversationId = action.payload;
        },
        closeChat: (state) => {
            state.isOpen = false;
        },
        switchConversation: (state, action) => {
            state.currentConversationId = action.payload;
        },
    },
});

export const {
    toggleChat,
    openChat,
    closeChat,
    switchConversation,
} = ChatSlice.actions;
export default ChatSlice.reducer