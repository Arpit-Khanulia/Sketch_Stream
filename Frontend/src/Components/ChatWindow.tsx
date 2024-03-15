import { Socket } from "socket.io-client";
import { useState,useEffect,useRef } from "react";
import { useAppSelector } from "../Redux/hooks";



interface ChatWindowProps{
    socket:Socket|null
}


interface backendDatachat{

    chat:string,
    name:string,
    uid:string | number
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


        socket?.on('newuser',(data)=>{

            console.log('ye aaya new user joined ka data',data);
            setIncommingMsg(prevState => [...prevState, { chat: data.chat, name: data.name, uid: data.uid }]);
            
        })

        socket?.on('chatbackend',(data:backendDatachat)=>{

            console.log('waha se message aaya ',data);
            
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

            {incommingMsg.map((e:backendDatachat,i)=>{

                if(e.uid == 0) return <div key={i} className="text-center mb-2 mt-2 text-rose-500 ">{e.name} joined the room</div>
                
                return <>
                
                    <div key={i} className={user.uid !== e.uid ? "chat chat-start" : "chat chat-end"}>
                        { (user.uid !== e.uid && e.uid !== incommingMsg[i-1]?.uid )&& <>
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS chat bubble component" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                            </div>
                        </div>
                        <div className="chat-header mb-1 mt-2">
                            {e.name}
                        </div>
                        </>}
                        <div className={user.uid !== e.uid ? "chat-bubble  text-orange-400":"chat-bubble  text-green-400"}>{e.chat}</div>
                    </div>


              </> 

            })}
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