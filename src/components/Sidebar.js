import React, { useEffect } from 'react';
import { useState } from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import  ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "../App.css"
import  SearchOutlined  from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from "../firebase.js"
const Sidebar = () => {
  const [rooms,setrooms] = useState([]);
  useEffect(()=>{
   db.collection('rooms').onSnapshot(snapshot=>{
    setrooms(snapshot.docs.map(doc=>(
      {
        id:doc.id,
        data: doc.data()
      }
    )))
   })
  },[])
  return (
    <div className = "sidebar">
        <div className = "sidebar_header">
            <Avatar></Avatar>
            <div className = "sidebar_headerRight">
                <IconButton>
                   <DonutLargeIcon></DonutLargeIcon>
                </IconButton>
                <IconButton>
                   <ChatIcon></ChatIcon>
                </IconButton>
                <IconButton>
                  <MoreVertIcon></MoreVertIcon>
                </IconButton>
            </div>
        </div>
        <div className = "sidebar_search">
            <div className = "sidebar_searchContainer">
                <SearchOutlined></SearchOutlined>
                <input placeholder = "Search or Start new chat" type = "text"></input>
            </div>
        </div>
        <div className = "sidebar_chats">
          <SidebarChat addNewChat></SidebarChat>
          {rooms.map(room=>{
            return <SidebarChat key = {room.id} room = {room.id} name = {room.data.name}></SidebarChat>
          })}
        </div>
    </div>
  )
}

export default Sidebar
