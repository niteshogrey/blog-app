import {createSlice} from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        isLoading: false,
        error:null
    },
    reducers:{
        fetchBlogLoading(state){
            state.isLoading= true,
            state.error= null
        },
        fetchBlogSuccess(state, action){
            state.isLoading = false,
            state.blogs = action.payload
        },
        fetchBlogFailure(state, action){
            state.isLoading = false,
            state.error = action.payload;
        },
        addBlogLoading(state){
            state.isLoading = true,
            state.error = null
        },
        addBlogSuccess(state, action){
            state.isLoading = false,
            state.blogs.push(action.payload)
        },
        addBlogFailure(state, action){
            state.isLoading= false,
            state.error = action.payload 
        },
        updateBlog(state, action){
            const index = state.blogs.findIndex(blog=> blog.id === action.payload.id)
            if (index !== -1) {
                state.blogs[index] = action.payload;
            }
        },

        deleteBlogLoading(state){
            state.isLoading = true,
            state.error = null
        },
        deleteBlogSuccess(state, action){
            state.isLoading = false,
            state.blogs = state.blogs.filter(blog=> blog.id !== action.payload)
        }
    }
})


export const {
    fetchBlogLoading,
    fetchBlogSuccess,
    fetchBlogFailure,
    addBlogLoading,
    addBlogSuccess,
    addBlogFailure,
    updateBlog,
    deleteBlogLoading,
    deleteBlogSuccess
} = blogSlice.actions;

export default blogSlice.reducer;