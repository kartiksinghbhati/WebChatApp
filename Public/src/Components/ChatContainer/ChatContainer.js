import React, { useState, useEffect, useRef } from 'react'
import './ChatContainer.css'
import Logout from '../Logout/Logout'
import ChatInput from '../ChatInput/ChatInput'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../../Utils/APIRoutes'
import { v4 as uuidv4 } from "uuid";

function ChatContainer(props) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    const myFunction1 = async () => {
        if(props.currentChat){
            const response = await axios.post(getAllMessagesRoute, {
                from: props.currentUser._id,
                to: props.currentChat._id,
            });
            setMessages(response.data);
        } 
    }
    useEffect(() => {
        myFunction1();
    }, [props.currentChat]);


    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: props.currentUser._id,
            to: props.currentChat._id,
            message: msg,
        });

        props.socket.current.emit("send-msg", {
            to: props.currentChat._id,
            from: props.currentUser._id,
            msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }


    const myFunction2 = () => {
        if (props.socket.current) {
            props.socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }
    useEffect(() => {
        myFunction2();
    }, []);


    const myFunction3 = () => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }
    useEffect(() => {
        myFunction3();
    }, [arrivalMessage]);


    const myFunction4 = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        myFunction4();
    }, [messages]);

    return (
        <div className='chatContainer'>
            <div className="chat-header">
                <div className="user-details">
                    <div className="user-avatar">
                        <img
                            src={props.currentChat.avatarImage}
                            alt=""
                        />
                    </div>
                    <div className="user-username">
                        <h3>{props.currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${message.fromSelf ? "sended" : "recieved"
                                    }`}
                            >
                                <div className="chat-content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer
