import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth';
import blogReducer from '../features/blog/blogSlice';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        blogs: blogReducer
    },
})

export default store;