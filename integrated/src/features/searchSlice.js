import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState =[{
    destination: '',
    startDate: 0,
    endDate: 0,
    options:{
        adult: 1,
        children: 0,
        room: 1,
    }
}]

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setNewSearch:{
            reducer (state, action){
                state.unshift(action.payload)
            },
            prepare:(destination, startDate, endDate, options)=>{
                return {payload: {
                    destination, 
                    startDate, 
                    endDate,
                    options}}
            }
        }
        
}
})

export const selectAllSearchs = (state)=> state.search;

export const {setNewSearch} = searchSlice.actions

export default searchSlice.reducer