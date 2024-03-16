import { useLayoutEffect, useState,useRef, useEffect } from 'react'
import { Socket } from "socket.io-client";
import rough from 'roughjs';
import Toolbar from "../Components/Toolbar"



interface drawingType{

    offsetX:number,
    offsetY:number,
    type:string,
    path:[offsetX:number,offsetY:number][]
    stroke:string
}

interface WhiteBoardProps{
    socket:Socket|null
}

const WhiteBoard:React.FC<WhiteBoardProps> = ({socket}) => {

    const ctx = useRef(null)
    const drawingRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing,setIsDrawing]  = useState(false);
    const [drawing,setdrawing] = useState<drawingType[]>([]);


    const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>)=>{

        setIsDrawing(true);
        setdrawing([...drawing, {offsetX:e.nativeEvent.offsetX, offsetY:e.nativeEvent.offsetY, type:'pen', path:[ [e.nativeEvent.offsetX, e.nativeEvent.offsetY] ],stroke:"red"  } ]);            

    }


    const handleMouseUp = (e:React.MouseEvent<HTMLCanvasElement>)=>{

        setIsDrawing(false);

    }
    const handleMouseMove = (e:React.MouseEvent<HTMLCanvasElement>)=>{

        if(isDrawing){
            console.log(e.nativeEvent.offsetX,e.nativeEvent.offsetY);

        
            
            const lastDrawing = drawing[drawing.length - 1];
            lastDrawing.path.push([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
            setdrawing([...drawing.slice(0, -1), lastDrawing]);
            socket?.emit("drawing_cordinates",drawing);
        }
        

    }

    console.log(drawing);
    
    useLayoutEffect(()=>{
        
        if(drawingRef.current){

            drawingRef.current.height = window.innerHeight;
            drawingRef.current.width = window.innerWidth;

            const roughline = rough.canvas(drawingRef.current);

            drawing.forEach(e=>{
                roughline.linearPath(e.path,{
                    stroke:e.stroke,
                    strokeWidth:4,
                    roughness:0
                });
            })
        }
    },[drawing])


    useEffect(()=>{

        const canwa = drawingRef.current;
        const ctxref = canwa?.getContext("2d")
        const ctx = ctxref;

    },[])

    useEffect(() => {
        if (socket) {
            socket.on('drawing_cordinates', (drawing_cordinates) => {
                // const receivedDrawing = JSON.parse(drawing_cordinates);
                console.log('Received drawing coordinates:', drawing_cordinates);
                setdrawing([...drawing,...drawing_cordinates]);
                // Update your drawing state or perform any necessary actions here
            });
        }
    }, []);

  return ( 
    <>
        <Toolbar/>

        <div  className=" h-[45%] sm:h-screen flex flex-col items-start justify-center sm:w-2/3 w-full ">         
            <canvas ref={drawingRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} />
        </div>
    </>
  )
}

export default WhiteBoard
