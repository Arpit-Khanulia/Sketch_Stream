import { useAppDispatch } from "../Redux/hooks"
import {MouseEvent} from 'react'
import { setTool } from "../Redux/slice/ToolSlice";

const Toolbar = () => {

    const dispatch = useAppDispatch();


    const handleClick = (e:MouseEvent<HTMLButtonElement>)=>{
        console.log(e.currentTarget.name);
        const tool = e.currentTarget.name;
        dispatch(setTool(tool))
    }
    return (
        <div className=" flex sm:flex-col flex-row items-start justify-center mr-2 ml-2 mb-2 mt-1"> 
            <ul className=" w-full menu menu-horizontal bg-base-200 rounded-box sm:flex-col flex-row items-center justify-center"> 
                <li>
                    <button name="pen"  onClick={handleClick}> <img src="https://icon-library.com/images/edit-pen-icon/edit-pen-icon-18.jpg" alt="loading..." className="sm:w-10 h-7" /></button>
                </li>
                <li>
                    <button name="rectangle" onClick={handleClick}><img src="https://icon-library.com/images/shapes-icon/shapes-icon-12.jpg" alt="" className="sm:w-10 h-7" /></button>
                </li>
                <li>
                    <button name="eraser" onClick={handleClick} ><img src="https://icon-library.com/images/eraser-icon/eraser-icon-18.jpg" alt="" className="sm:w-10 h-7" /></button>
                </li>
            </ul>
        </div>
    )
}

export default Toolbar