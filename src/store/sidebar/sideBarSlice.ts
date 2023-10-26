import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: window.innerWidth > 768,
    drawerWidth: 240,
}

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSideBar: (state) => {
        state.open = !state.open;
        if(!state.open) {
            state.drawerWidth = 0;
        } else {
            state.drawerWidth = 240;
        }
    }
  }
});

export const {toggleSideBar} = sideBarSlice.actions

export default sideBarSlice.reducer