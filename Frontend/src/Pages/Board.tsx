import ChatWindow from "../Components/ChatWindow"
import { useAppSelector } from "../Redux/hooks"
import { Socket } from "socket.io-client"

import WhiteBoard from "../Components/WhiteBoard"

interface ChatPageProps{
  socket:Socket|null
}

const Board:React.FC<ChatPageProps> = ({socket}) => {

  const user = useAppSelector(state=>state.User);
  console.log('ye mene board ke under print karaya he',user);
  
  return (
    <>
      <div className="h-screen sm:flex overflow-hidden">
          <WhiteBoard />
        <div className="h-[45%] sm:h-screen flex flex-col items-end sm:w-1/3 w-full border-l-2 border-t-2 border-b-2 border-gray-700  ">
          <ChatWindow socket = {socket} />
        </div>
      </div>
    </>
  )
}

export default Board