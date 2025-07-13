// import {configureStore} from '@reactjs/toolkit'
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'

const store = configureStore({
    reducer: {
        // login: (state, action) => {
        auth: authSlice,

    }
});

export default store;