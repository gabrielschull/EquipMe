import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store'
import { supabase, supabaseClient } from "../../services/supabase.service";


interface ChatProps {
  ownerId: string | null;
  userId: string | null;
}
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC<ChatProps> = ({ownerId}): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.User);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);


  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: inputValue, sender: 'user' },
    ]);
    setInputValue('');
  };

  const handleButtonClick = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleCloseClick = () => {
    setIsChatOpen(false);
  };


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
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex justify-${
                  message.sender === 'user' ? 'end' : 'start'
                } mb-2`}
              >
                <div
                  className={`bg-blue-500 p-2 rounded-lg text-white max-w-xs ${
                    message.sender === 'user' ? 'ml-2' : 'mr-2'
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
