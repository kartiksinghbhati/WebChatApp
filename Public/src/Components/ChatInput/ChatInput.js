import React, {useState} from 'react'
import './ChatInput.css';
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from 'emoji-picker-react';

// Emoji

function ChatInput(props) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
      setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        console.log(emojiObject);
        message += emojiObject.emoji;
        setMsg(message);
    };
    
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            props.handleSendMsg(msg);
            setMsg("");
        }
    };
  
    return (
        <div className='chatinput'>
            <div className="chatinput-button-container">
                <div className="chatinput-emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} height={350} width={300}/>}
                </div>
            </div>
            <form className="chatinput-input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
