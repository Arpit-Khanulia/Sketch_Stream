import { Socket } from "socket.io-client";
import { useState,useEffect,useRef } from "react";
import { useAppSelector } from "../Redux/hooks";

interface ChatWindowProps{
    socket:Socket|null
}


interface backendDatachat{

    chat:string,
    name:string,
    uid:string
}

const ChatWindow:React.FC<ChatWindowProps> = ({socket}) => {

    const user = useAppSelector(state=>state.User);

    
    const [ chat,setChat] = useState('');
    const [incommingMsg,setIncommingMsg] = useState<backendDatachat[]>([]);

    const scrollDev = useRef<HTMLDivElement>(null);

    const handleClick = ()=>{

        setIncommingMsg(prevState => [...prevState, { chat: chat, name: user.name, uid: user.uid }]);

        if(socket)console.log('heyyyy');
        
        socket?.emit('chatmessage',{chat,name:user.name,uid:user.uid});
        setChat("");
    }
    
    useEffect(()=>{
        if (scrollDev.current) {
            scrollDev.current.scrollTop = scrollDev.current.scrollHeight;
        }
        
    },[incommingMsg])


    useEffect(()=>{

        socket?.on('chatbackend',(data:backendDatachat)=>{
            console.log(data.chat);
            setIncommingMsg(prevState => [...prevState, { chat: data.chat, name: data.name, uid: data.uid }]);
        })

        if (scrollDev.current) {
            scrollDev.current.scrollTop = scrollDev.current.scrollHeight;
        }
    },[])

    console.log(incommingMsg);
    

    return (
        <>
            <div ref = {scrollDev} className=" w-full h-full mt-5 p-3  flex-1 overflow-y-auto ">

            {incommingMsg.map((e:backendDatachat,i)=>(
                <div key={i} className={user.uid !== e.uid ? "chat chat-start" : "chat chat-end"}>
                    <div className="chat-bubble mt-1 mb-1">{e.chat}</div>
                </div>
            ))}
            </div>

            <div className=" w-full flex  p-3 ">
                <div className="w-full mr-2">
                <input onKeyDown={(e) => {if (e.key === 'Enter')  {handleClick()}}}  onChange={(e)=>setChat(e.target.value)} value={chat} type="text" placeholder="Type here" className="p-2 w-full h-full rounded-md" />
                </div>
                <button onClick={handleClick} className="btn btn-active ml-1  ">Send</button>
            </div>
        </>
    )
}

export default ChatWindow;