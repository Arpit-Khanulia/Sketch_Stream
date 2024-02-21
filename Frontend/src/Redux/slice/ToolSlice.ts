import { createSlice } from "@reduxjs/toolkit";


const CurrentTool = createSlice({

    name:'tool',
    initialState:{
        tool:'pen'
    },
    reducers:{

        setTool:(state,action)=>{
            state.tool = action.payload
        }
    }
})

export const {setTool} = CurrentTool.actions; 
export default CurrentTool.reducer

