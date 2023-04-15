import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import Welcome from "../Welcome/Welcome";
import ChatContainer from '../ChatContainer/ChatContainer';
import styles from './Chat.module.css';
import axios from 'axios';
import { allUsersRoute, host } from '../../Utils/APIRoutes';
import  {io} from "socket.io-client";

function Chat() {

  const navigate = useNavigate();

  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const myFunction1 = async () =>{
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }

  }
  useEffect(() => {
    myFunction1();
  }, []);


  const myFunction3 = async () =>{
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }
  useEffect(() => {
    myFunction3();
  }, [currentUser]);



  const myFunction2 = async () =>{
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }
  useEffect(() => {
    myFunction2();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className={styles.chat}>
        <div className={styles.container}>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )}
        </div>
      </div>
    </>
  )
}

export default Chat


