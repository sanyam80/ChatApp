import React from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import {useState,useEffect} from "react";
import { SearchOutlined,AttachFile,MoreVert,InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import "../App.css";
import db from "../firebase";
import {useParams} from "react-router-dom";
import { useStateValue } from './StateProvider';
import firebase from "firebase/compat/app";
const Chat = () => {
    const [seed,setseed] = useState("");
    const [input,setinput] = useState("");
    const{roomId} = useParams();
    const [roomName,setroomName] = useState("");
    const[messages,setmessages] = useState([]);
    const[{user},dispatch] = useStateValue();
    useEffect(()=>{
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
          setroomName(snapshot.data().name)
        ))
      db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timeStamp","asc")
      .onSnapshot(snapshot=>setmessages(snapshot.docs.map(doc=>doc.data())))

      }
  },[roomId])
    useEffect(()=>{
     setseed(Math.floor(Math.random()*5000))
    },[]);
    const sendMessage=(e)=>{
      e.preventDefault();
      db.collection('rooms').doc(roomId).collection('messages').add({
        messages:input,
        name:user.displayName,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setinput("")
    }
  return (
    <div className = "chat">
        <div className = "chat_header">
        <Avatar src = {`https://avatars.dicebear.com/api/human/b${seed}.svg`}></Avatar>
        <div className = "chat_headerInfo">
            <h3>{roomName}</h3>
            <p2>Last message..</p2>
        </div>
        <div className = "chat_headerRight">
        <IconButton>
                 <SearchOutlined></SearchOutlined>
                </IconButton>
                <IconButton>
                   <AttachFile></AttachFile>
                </IconButton>
                <IconButton>
                  <MoreVert></MoreVert>
                </IconButton>
        </div>
        </div>
        <div className = "chat_body">
          {messages.map(message=> (
        <div className = {`chat_message${message.name===user.displayName && "chat_receiver"}`}>
            <span className = "chat_name">{message.name}</span>
            {/* <span className = "chat_timestamp">{new Date(message.timeStamp?.toDate()).toUTCString()}</span> */}
          {message.message}
            </div>))}
             </div> 
        <div className = "chat_footer">
          <InsertEmoticon></InsertEmoticon>
          <form>
            <input value = {input} onChange={e=>setinput(e.target.value)} placeholder = "Type a message" type = "text"></input>
            <button onClick = {sendMessage} type = "submit">Send a message</button>
          </form>
          <MicIcon></MicIcon>
        </div>
    </div>
  )
}

export default Chat