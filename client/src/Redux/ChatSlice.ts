import { createSlice } from '@reduxjs/toolkit';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {isOpen: false, currentConversationId: '', previousConversations: []},
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen
        },
        openChat: (state, action) => {
            // if (state.currentConversationId) {
            //     state.previousConversations.push(state.currentConversationId)
            // }
            state.isOpen = true;
            state.currentConversationId = action.payload;
        },
        closeChat: (state) => {
            state.isOpen = false;
        },
        // switchToPreviousChat: (state) => {
        //     if (state.previousConversations.length > 0) {
        //         state.currentConversationId = state.previousConversations.pop()
        //     }
        // },
    },
});

export const {
    toggleChat,
    openChat,
    closeChat,
    // switchToPreviousChat
} = ChatSlice.actions;
export default ChatSlice.reducer