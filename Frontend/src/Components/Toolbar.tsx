import { useAppDispatch } from "../Redux/hooks"
import {MouseEvent} from 'react'
import { setTool } from "../Redux/slice/ToolSlice";
import { FaPencilAlt } from "react-icons/fa";
import { IoShapes } from "react-icons/io5";
import { BiSolidEraser } from "react-icons/bi";

const Toolbar = () => {

    const dispatch = useAppDispatch();


    const handleClick = (e:MouseEvent<HTMLButtonElement>)=>{
        console.log(e.currentTarget.name);
        const tool = e.currentTarget.name;
        dispatch(setTool(tool))
    }
    return (
        <div className=" flex sm:flex-col flex-row items-start justify-center mr-2 ml-2 mb-2 mt-1"> 
            <ul className="menu menu-horizontal sm:block bg-base-200 rounded-box z-99999">
                <li >
                    <button name="pen" onClick={handleClick} style={{ fontSize: "24px" }}> <FaPencilAlt /></button>                
                </li>
                <li>
                    <button name="rectangle" onClick={handleClick} style={{ fontSize: "24px" }}><IoShapes /></button>
                </li>
                <li>
                    <button name="eraser" onClick={handleClick} style={{ fontSize: "24px" }} ><BiSolidEraser /></button>
                </li>
            </ul>
        </div>
    )
}

export default Toolbar
