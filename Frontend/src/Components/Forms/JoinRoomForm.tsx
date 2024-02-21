import { useState,FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { updateUser } from "../../Redux/slice/UserSlice";
import { Socket } from "socket.io-client";
import { nanoid } from "nanoid";

interface JoinRoomProps {
  socket: Socket|null
}


const JoinRoomForm:React.FC<JoinRoomProps> = ({socket}) => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  interface formdataType{
    name:string
    roomid:string
    uid:string
  }
  
  const initialFormdata:formdataType = {
  
    name:"",
    roomid:"",
    uid:""
  
  }
  
  const [formdata, setformdata] = useState(initialFormdata);
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setformdata({...formdata,[e.target.name]:e.target.value});
  
  }
  console.log(formdata);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    
    e.preventDefault();

    const uid = nanoid(6);
    dispatch(updateUser({
      uid:uid,
      name:formdata.name,
      roomid:formdata.roomid
    }))

    // socket?.emit('userJoined', {uid,formdata.roomid,formdata.roomid});
    socket?.emit('userJoined', { uid, roomid: formdata.roomid, name: formdata.name });

    console.log('submited');


    navigate(`/${formdata.roomid}`);
  
  }


  return (
    <div className="flex-row w-full sm:w-3/4 md:w-1/2 p-10 grid grid-cols-1 space-y-4 ">
    <span className="font-bold text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl z-100 text-gray-100">
        Play
      </span>

      <form onSubmit={(e)=>handleSubmit(e)}>

      <div className="flex-col">
        <span className="font-bold text-2xl">Join Room</span>
        <div className="space-y-2 mt-5">
          <input
            name="name"
            className="w-full rounded-md"
            type="text"
            placeholder="Enter Your Name"
            value={formdata.name}
            onChange={handleChange}
            
          />
          <input
            name="roomid"
            className="w-full rounded-md"
            type="text"
            placeholder="Room ID"
            value={formdata.roomid}
            onChange={handleChange}
          />
          <button type="submit" className="w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500 hover:bg-purple-600 hover:shadow-lg mt-2">
            Join
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default JoinRoomForm;
