import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store'
import { supabase, supabaseClient } from "../../services/supabase.service";
import { Root } from 'react-dom/client';
import { addMessage, setMessages } from '../../Redux/MessageSlice';
import { Message } from '../../types/message.type';
import { Data } from '@react-google-maps/api';

const Chat: React.FC = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [inputValue, setInputValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messages = useSelector((state: RootState) => state.Message)
  const dispatch = useDispatch()

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //\console.log('userInfo!!! =>>>', userInfo)



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    const newMessage : Message = {
      content: inputValue,
      sender_id: userInfo.profile.id,
      conversation_id: "a9474d61-2df9-41a9-bb1f-d80daa9b632e",
    }

    console.log("NEWMSG ==>", newMessage)

    const { data: message, error } = await supabaseClient
    .from('Messages')
    .insert(newMessage);

    if(error) {
      console.log("Error sending message", error)
    } else {
      dispatch(addMessage(inputValue))

    }
    setInputValue('')

  }

  const handleButtonClick = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleCloseClick = () => {
    setIsChatOpen(false);
  };


useEffect(() => {

  async function getAllConversations() {
    const { data: conversations, error } = await supabaseClient
      .from('Conversations')
      .select('id')
      .or(`member1.eq.${userInfo.profile.id},member2.eq.${userInfo.profile.id}`);

    if (error) {
      console.error("Error fetching conversations: ", error);
      return [];
    }

    return conversations;
  }

  async function getMessagesByConversation(conversationId: string): Promise<Message[]>{
    const { data: messages, error } = await supabaseClient
      .from('Messages')
      .select('*')
      .eq('conversation_id', conversationId);
      console.log("GETMESSAGESBYCONVERSATION ==>", messages)

    if (error) {
      console.error("Error fetching messages: ", error);
      return [];
    }

    return messages as Message[];
  }

  async function getConversationsAndMessages() {
    const conversations = await getAllConversations();
    console.log("CONVOS ==>", conversations)
    const messages = await Promise.all(conversations.map(conversation => getMessagesByConversation(conversation.id)))
    console.log("MSGS", messages)
    const messagesByConversation: Record<string, Message[]> = {};
    for(let i = 0; i < conversations.length; i++) {
      messagesByConversation[conversations[i].id] = messages[i];
    }
    dispatch(setMessages(messagesByConversation));
    console.log("MESSAGESBYCONVO ==> ", messagesByConversation)
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
      filter: 'conversation_id=eq.a9474d61-2df9-41a9-bb1f-d80daa9b632e',
    },
    (payload) => {
      console.log("PAYLOAD ==>", payload)
      dispatch(addMessage(payload.new))
    }
  )
  .subscribe()

}, [dispatch, userInfo.profile.id])


  return (
    <div className='flex'>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className='fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none'
      >
        {isChatOpen ? '-' : '+'}
      </button>
      {isChatOpen && (
        <div
          ref={chatRef}
          className='fixed bottom-16 right-4 bg-gray-100 h-96 w-64 rounded-lg mx-8 break-all flex flex-col'
        >

          <button
            onClick={handleCloseClick}
            style={{
              color: "darkgrey",
              border: "none",
              borderRadius: "4px",
              width: "1.3rem",
              height: "1.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              fontWeight: "900",
              transition: "box-shadow 0.3s",
            }}
            className='absolute top-2 right-2 text-white'
          >
            X
          </button>
          <div className='flex-grow overflow-y-auto p-4'>
  {messages["a9474d61-2df9-41a9-bb1f-d80daa9b632e"]?.map((message: Message) => (
    <div
      key={message.id}
      className={`flex justify-${
        message.sender_id === userInfo.profile.id ? 'end' : 'start'
      } mb-2`}
    >
      <div
        className={`${
          message.sender_id === userInfo.profile.id ? 'ml-2 bg-blue-500 p-2 rounded-lg text-white max-w-xs bg-blue-500 p-2 rounded-lg text-white max-w-xs' : 'mr-2 bg-gray-400 p-2 rounded-lg text-white max-w-xs'
        }`}
      >
        {message.content}
      </div>
    </div>
  ))}
</div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className='border-2 border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-blue-500 whitespace-normal overflow-wrap-normal'
              placeholder='Type your message...'
              style={{ flex: 'none' }}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
