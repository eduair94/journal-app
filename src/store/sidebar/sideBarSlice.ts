import { createSlice } from '@reduxjs/toolkit'
import { purpleTheme } from '../../theme';

const mdBreakpoint = purpleTheme.breakpoints.values.md;
const initialState = {
    open: window.innerWidth > mdBreakpoint,
    drawerWidth: 240,
}

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSideBar: (state) => {
      if(!state.open) state.open = true;
    },
    closeSideBar: (state) => {
      if(state.open) state.open = false;
    },
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

export const {toggleSideBar, openSideBar, closeSideBar} = sideBarSlice.actions

export default sideBarSlice.reducer