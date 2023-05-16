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
    },
});

export const {
    toggleChat,
    openChat,
    closeChat,
} = ChatSlice.actions;
export default ChatSlice.reducer