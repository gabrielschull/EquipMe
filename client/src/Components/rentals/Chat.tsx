import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { supabase, supabaseClient } from '../../services/supabase.service';
import { Root } from 'react-dom/client';
import { addMessage, setMessages } from '../../Redux/MessageSlice';
import { Message } from '../../types/message.type';
import { Data } from '@react-google-maps/api';
import { openChat, closeChat, toggleChat } from '../../Redux/ChatSlice';
import { User } from '../../types/user.type'
import { formatDistanceToNow, format, parseISO } from 'date-fns';


const Chat: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [inputValue, setInputValue] = useState('');
  const chatState = useSelector((state: RootState) => state.Chat);

  const messages = useSelector((state: RootState) => state.Message)
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const dispatch = useDispatch()


  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //\console.log('userInfo!!! =>>>', userInfo)

  // useEffect(() => {

  //  dispatch(openChat(conversationId))
  // }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    const newMessage : Message = {
      content: inputValue,
      sender_id: userInfo.profile.id,
      conversation_id: chatState.currentConversationId,
    }


    const { data: message, error } = await supabaseClient
      .from('Messages')
      .insert(newMessage);

    if (error) {
      console.log('Error sending message', error);
    } else {
      dispatch(addMessage(inputValue));
    }
    setInputValue('')

  }

  const handleButtonClick = () => {
    dispatch(toggleChat());
  };

  const handleCloseClick = () => {
    dispatch(closeChat());
  };


  useEffect(() => {
    async function getAllConversations() {
      const { data: conversations, error } = await supabaseClient
        .from('Conversations')
        .select('id')
        .or(
          `member1.eq.${userInfo.profile.id},member2.eq.${userInfo.profile.id}`
        );

      if (error) {
        console.error('Error fetching conversations: ', error);
        return [];
      }

      return conversations;
    }



  async function getMessagesByConversation(
    conversationId: string
  ): Promise<Message[]> {
    const { data: messages, error } = await supabaseClient
      .from('Messages')
      .select('*')
      .eq('conversation_id', conversationId);


    if (error) {
      console.error('Error fetching messages: ', error);
      return [];
    }

    return messages as Message[];
  }

  async function getConversationsAndMessages() {
    const conversations = await getAllConversations();


    const messages = await Promise.all(conversations.map(conversation => getMessagesByConversation(conversation.id)))

    const messagesByConversation: Record<string, Message[]> = {};
    for (let i = 0; i < conversations.length; i++) {
      messagesByConversation[conversations[i]?.id] = messages[i];
    }
    dispatch(setMessages(messagesByConversation));


  }
getConversationsAndMessages()


supabaseClient
  .channel('messagesChannel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'Messages',
      filter: `conversation_id=eq.${chatState.currentConversationId}`,
    },
    (payload) => {

      dispatch(addMessage(payload.new))
    }
  )
  .subscribe()

}, [dispatch, userInfo.profile.id, chatState.currentConversationId])

useEffect(() => {
  async function fetchOtherUser() {
    setOtherUser(null)
    const conversation = await supabaseClient
      .from('Conversations')
      .select('*')
      .eq('id', chatState.currentConversationId)
      .single();

    if (conversation.error) {
      console.error("Error fetching conversation: ", conversation.error);
      return;
    }

    const otherUserId = conversation.data.member1 === userInfo.profile.id
      ? conversation.data.member2
      : conversation.data.member1;

    const otherUserDetails = await supabaseClient
      .from('Users')
      .select('*')
      .eq('id', otherUserId)
      .single();

    if (otherUserDetails.error) {
      console.error("Error fetching other user's details: ", otherUserDetails.error);
      return;
    }

    setOtherUser(otherUserDetails.data as User);
  }

  fetchOtherUser();
}, [chatState.currentConversationId, userInfo.profile.id]);


  return (
    <div className='flex'>
      {otherUser && (
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className='fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none'
      >
        {otherUser && chatState.currentConversationId ? (
    <img
      src={
        'https://yiiqhxthvamjfwobhmxz.supabase.co/storage/v1/object/public/images/' +
        otherUser.id +
        '/profileImage'
      }
      alt="User"
      className='w-full h-full object-cover rounded-full'
    />
  ) : (
    chatState.isOpen ? '-' : '+'
  )}
</button>
)}
      {chatState.isOpen && (
        <div
          ref={chatRef}

          className='fixed bottom-16 right-4 bg-gray-100 h-96 w-64 rounded-lg mx-8 break-all flex flex-col'>
          <button
            onClick={handleCloseClick}
            style={{
              color: 'darkgrey',
              border: 'none',
              borderRadius: '4px',
              width: '1.3rem',
              height: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              fontWeight: '900',
              transition: 'box-shadow 0.3s',
            }}
            className="absolute top-2 right-2 text-white">
            X
          </button>
          {otherUser && (
              <h2 style={{marginLeft: "10px", marginTop:"7px", marginBottom:"7px"}}>
                {otherUser.first_name} {otherUser.last_name}
              </h2>
            )}
          <div className='flex-grow overflow-y-auto p-4'>


          {messages[`${chatState.currentConversationId}`]?.map((message: Message) => {
  const messageDate = parseISO(message.created_at!);
  const now = new Date();
  let formattedDate = '';

  const diffInMinutes = (now.getTime() - messageDate.getTime()) / (1000 * 60);
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 1) {
    formattedDate = 'Just now';
  } else if (diffInHours < 1) {
    const minutes = Math.round(diffInMinutes);
    formattedDate = `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 1) {
    const hours = Math.round(diffInHours);
    formattedDate = `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    const days = Math.round(diffInDays);
    formattedDate = `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    formattedDate = format(messageDate, 'MM-dd');
  }

  return (
    <div
      key={message.id}
      className={`flex justify-${
        message.sender_id === userInfo.profile.id ? 'end' : 'start'
      } mb-2`}
    >
      <div
        className={`${
          message.sender_id === userInfo.profile.id ? 'ml-2 bg-indigo-400 p-2 rounded-lg text-white max-w-xs' : 'mr-2 bg-gray-400 p-2 rounded-lg text-white max-w-xs'
        } `}
      >
        {message.content}
        <div className='text-xs'>{formattedDate}</div>
      </div>
    </div>
  );
})}
</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='border-2 border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500 whitespace-normal overflow-wrap-normal'
              placeholder='Type your message...'
              style={{flex: 'none'}}

            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
