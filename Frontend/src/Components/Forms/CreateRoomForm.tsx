import { nanoid } from 'nanoid'
import { useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { updateUser } from '../../Redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface CreateRoomProps {
  socket: Socket|null
}

const CreateRoomForm: React.FC<CreateRoomProps>= ({socket}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [id,setid] = useState(nanoid(6));
    
    
    const handleGenerate = ()=>{

        const temp = nanoid(6);
        setid(temp);

    }


    const handleCopy = ()=>{
        navigator.clipboard.writeText(id);
        console.log('copied to clipboard');
        
    }


    const [name,setName] = useState('');


    const handleSubmit = ()=>{

      const uid= nanoid(6);
      dispatch(updateUser({
        uid:uid,
        name:name,
        roomid:id
      }))

      socket?.emit('userJoined', {uid, name, roomid:id });

      navigate(`/${id}`)

    }

    console.log(name);
    
    
    return (
      <div className="flex-row w-full sm:w-3/4 md:w-1/2 p-10 grid grid-cols-1 space-y-4 ">
        <span className="font-bold text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl z-100 text-gray-100">
          Scribble
        </span>
  
        <div className="flex-col">
          <span className="font-bold text-2xl">Create Room</span>
              <div className="space-y-2 mt-5">
                    <input
                    name="name"
                    className="w-full rounded-md"
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <div className="flex">
                        <input
                        name="roomid"
                        className="w-full rounded-md"
                        type="text"
                        disabled
                        placeholder="Generate Roomid"
                        onChange={(e) => setid(e.target.value)}
                        value={id}
                        />
                        <button onClick={handleCopy} className="btn btn-xs">copy</button>
                        <button onClick={handleGenerate} className="btn btn-xs">Generate</button>

                    </div>
                    <button onClick={()=>handleSubmit()} className="w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500 hover:bg-purple-600 hover:shadow-lg mt-2">
                      Create
                    </button>
              </div>
        </div>
      </div>
    );
  };
  
  export default CreateRoomForm;