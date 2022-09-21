import React from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import {useState,useEffect} from "react";
import { SearchOutlined,AttachFile,MoreVert,InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import "../App.css";
import db from "../firebase";
import {useParams} from "react-router-dom"

const Chat = () => {
    const [seed,setseed] = useState("");
    const [input,setinput] = useState("");
    const{roomId} = useParams();
    const [roomName,setroomName] = useState("");
    useEffect(()=>{
      if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
          setroomName(snapshot.data().name)
        ))
      } 


    },[roomId])
    useEffect(()=>{
     setseed(Math.floor(Math.random()*5000))
    },[]);
    const sendMessage=(e)=>{
      e.preventDefault();
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
          <p className = {`chat_message${true && ".chat_receiver"}`}>
            <span className = "chat_name">TWD</span> <div className = "txt">Hope you are doing fine
            <span className = "chat_timestamp">{new Date().toLocaleTimeString()}</span></div></p>
            
            <p className = "chat_message">
            <span className = "chat_name">Nabendu</span> <div className = "txt">Hope you are doing great
            <span className = "chat_timestamp">{new Date().toLocaleTimeString()}</span></div></p>
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