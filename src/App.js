
import './App.css';
import Sidebar from "./components/Sidebar.js";
import Chat from './components/Chat';
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login.js";
import {useState} from "react";
import { useStateValue } from './components/StateProvider';
function App() {
  const[{user},dispatch] = useStateValue();
  return (
    <div className="app">
      {!user? <Login></Login>:(
   <div className = "app_body">
<Sidebar></Sidebar>
 <Routes>
 <Route path = "/rooms/:roomId" element = {<Chat></Chat>}></Route> 
 <Route path = "/" element = {<Chat></Chat>}></Route> 
  </Routes>  
</div>
      )}
   
    
    </div>
  );
}

export default App;
