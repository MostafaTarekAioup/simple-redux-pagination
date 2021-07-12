
import {createSlice , configureStore} from '@reduxjs/toolkit'
const paginationInitialState = {
 data:[],
 isLoading:true
}

const paginationSlice = createSlice({
 name:'pagination',
 initialState:paginationInitialState,
 reducers:{
  fetchData(state,action){
   state.data = action.payload;
   state.isLoading = false
  }
 }
})

const store = configureStore({
 reducer:paginationSlice.reducer
})

export const paginationActions = paginationSlice.actions
export default store