import CreateRoomForm from "../Components/Forms/CreateRoomForm";
import JoinRoomForm from "../Components/Forms/JoinRoomForm";
import { Socket } from "socket.io-client";

interface HomePageProps {
  socket: Socket|null
}

const HomePage: React.FC<HomePageProps> = ({socket}) => {
  return (
    <div>
      <div className="w-full h-screen p-4 flex justify-center items-center overflow-hidden">
      <main className=" flex flex-col md:flex-row justify-between w-full md:w-5/6 xl:w-4/6  items-center bg-1D232A rounded-lg font-mono mt-4 md:mt-0">          
          <CreateRoomForm socket = {socket} />
          <JoinRoomForm socket={socket} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;