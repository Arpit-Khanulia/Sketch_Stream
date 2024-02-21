import { io,Socket } from "socket.io-client"
import { useEffect,useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import Board from "./Pages/Board";

const App = () => {


  const [socket, setSocket] = useState<Socket | null>(null);

  const options =  {
  forceNew: true,
  reconnectionAttempts: Infinity,
  timeout: 100000,
  transports: ['websocket']
};

  
  useEffect(()=>{
    const newsocket = io("http://localhost:3000",options)
    setSocket(newsocket);

    return () => {
      socket?.disconnect();
    }

  },[])

  return (
    <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage socket = {socket} />} />
              <Route path="/:roomid" element={<Board socket = {socket}  />} />
          </Routes> 
        </BrowserRouter>
    </div>
  )
}

export default App
