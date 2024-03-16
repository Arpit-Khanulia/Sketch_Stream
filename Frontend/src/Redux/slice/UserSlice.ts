import { createSlice } from '@reduxjs/toolkit'

  const name = localStorage.getItem('name');
  const uid = localStorage.getItem('uid');
  const roomid = localStorage.getItem('roomid');  

  const User = createSlice({
  name: 'User',
  initialState: {
    uid: uid||"",
    name: name||"",
    roomid: roomid||""
  },
  reducers: {
    updateUser: (state, action) => {

      localStorage.setItem('name',action.payload.name)
      localStorage.setItem('uid',action.payload.uid)
      localStorage.setItem('roomid',action.payload.roomid)
      state.name = action.payload.name
      state.roomid = action.payload.roomid
      state.uid = action.payload.uid
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateUser} = User.actions

export default User.reducer