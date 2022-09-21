
import './App.css';
import Sidebar from "./components/Sidebar.js";
import Chat from './components/Chat';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div className = "app_body">
       <Sidebar></Sidebar>
       <Routes>
       <Route path = "/rooms/:roomId" element = {<Chat></Chat>}></Route>
       <Route path = "/" element = {<Chat></Chat>}></Route>
        </Routes>
      </div>
    
    </div>
  );
}

export default App;
