import React from 'react';
import "../App.css";
import {Avatar} from "@material-ui/core";
import {useState,useEffect} from "react";
import db from "../firebase";
import {Link} from "react-router-dom"

const SidebarChat = ({room,name,addNewChat}) => {
    const [seed,setseed] = useState("");
    const [messages,setmessages] = useState("");
    useEffect(()=>{
   if(room){
    db.collection("rooms")
    .doc(room)
    .collection("messages")
    .orderBy("timeStamp","desc")
    .onSnapshot(snapshot=>setmessages(snapshot.docs.map(doc=>doc.data())))
   }
    },[room])
    useEffect(()=>{
     setseed(Math.floor(Math.random()*5000))
    },[]);
    const createChat = ()=>{
        const roomName = prompt("Please Enter name for Chat");
        if(roomName){
          db.collection('rooms').add({
            name:roomName
          })
        }
    }
  return !addNewChat ? (
    <Link to = {`/rooms/${room}`}>
    <div className = "sidebarChat">
        <Avatar src = {`https://avatars.dicebear.com/api/human/b${seed}.svg`}></Avatar>
        <div className = "sidebarChat_info">
            <h2>{name}</h2>
            <p2>{messages[0]?.messages}</p2>
        </div>
    </div>
     </Link>
  ):(<div onClick = {createChat} className = "sidebarChat">
    <h2>Add New Chat</h2>
  </div>)
}

export default SidebarChat
