import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialData={
    users:[],
    status:'',
    error:false,
}

export let fetchUsers=createAsyncThunk('user/fetch',async ()=>{
    try {
        const resp=await fetch("https://jsonplaceholder.typicode.com/users");
    const data=await resp.json()
    return data
    } catch (error) {
        throw error
    }
})
const userSlice=createSlice({
    name:'user',
    initialState:initialData,
    reducers:{
        fetchUsers:(state,action)=>{},
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status="completed"
            state.users=action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status="Error"
            state.users=[]
            state.error=action.error.message
        })
    },
})
const store=configureStore({
    reducer:{
        user:userSlice.reducer
    }
})
export default store