import { createSlice } from '@reduxjs/toolkit'

  const User = createSlice({
  name: 'User',
  initialState: {
    uid:"",
    name: "",
    roomid:""
  },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name
      state.roomid = action.payload.roomid
      state.uid = action.payload.uid
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateUser} = User.actions

export default User.reducer