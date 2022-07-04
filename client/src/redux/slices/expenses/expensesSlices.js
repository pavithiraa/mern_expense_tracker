import { createAsyncThunk,createSlice,createAction } from "@reduxjs/toolkit";
import axios from "axios"
import baseURL from "../../../utils/baseURL";


//create action for redirect to reset the data after created..
export const resetExpCreated = createAction('expense/created/reset')
export const resetExpUpdate = createAction('expense/update/reset')
export const resetExpDelete = createAction('income/delete/reset')

//create action
export const createExpAction = createAsyncThunk(
    'expense/create', 
    async(payload,{rejectWithValue,getState,dispatch})=>{
        //get user token from store

        const userToken= getState()?.users?.userAuth?.token;
        const config={
            headers:{
                "Content-Type":'application/json',
                Authorization:`Bearer ${userToken}`
            }
        }
        try {
            //make http call here
            const {data}= await axios.post(`${baseURL}/expenses`,
            payload,
            config
            );
           //dispatch
           dispatch(resetExpCreated());
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);


//get all action
export const getAllExpAction = createAsyncThunk(
    'expense/get', 
    async(payload,{rejectWithValue,getState,dispatch})=>{
        //get user token from store

        const userToken= getState()?.users?.userAuth?.token;
        const config={
            headers:{
                "Content-Type":'application/json',
                Authorization:`Bearer ${userToken}`
            }
        }
        try {
            //make http call here
            const {data}= await axios.get(`${baseURL}/expenses?page=${payload}`,
             config
            );

            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update expense

export const updateExpAction = createAsyncThunk(
    "expense/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      //get user token from store
      const userToken = getState()?.users?.userAuth?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      try {
        //make http call here
        const { data } = await axios.put(
          `${baseURL}/expenses/${payload?.id}`,
          payload,
          config
        );
        dispatch(resetExpUpdate());
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //delete
export const deleteExpenseAction = createAsyncThunk(
  `expenses/delete`,
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.delete(
        `${baseURL}/expenses/${payload?.id}`,
        config
      );
      dispatch(resetExpDelete());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);





//slice
const expenseSlices= createSlice({
    name:"expenses",
    initialState:{},
    extraReducers:(builder)=>{
        //create expense
        builder.addCase(createExpAction.pending,(state,action)=>{
            state.loading = true;
        });
       //reset action
       builder.addCase(resetExpCreated,(state,action)=>{
        state.isExpCreated = true;
       })
        builder.addCase(createExpAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.expenseCreated= action?.payload;
            //to handle client-side error
            state.appErr= undefined;
            //to handle server-side error
            state.serverErr= undefined;
            //reset action
            state.isExpCreated = false;
        });

        builder.addCase(createExpAction.rejected,(state,action)=>{
            state.loading=false;
             //to handle client-side error
            state.appErr= action?.payload?.msg;
            //to handle server-side error
            state.serverErr= action?.error?.msg;
        })

        //getall expenses
        builder.addCase(getAllExpAction.pending,(state,action)=>{
            state.loading = true;
        });

        builder.addCase(getAllExpAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.expensesList= action?.payload;
            //to handle client-side error
            state.appErr= undefined;
            //to handle server-side error
            state.serverErr= undefined;
        });

        builder.addCase(getAllExpAction.rejected,(state,action)=>{
            state.loading=false;
             //to handle client-side error
            state.appErr= action?.payload?.msg;
            //to handle server-side error
            state.serverErr= action?.error?.msg;
        })

         //update expenses
         builder.addCase(updateExpAction.pending, (state, action) => {
            state.loading = true;
          });
        //  reset action
          builder.addCase(resetExpUpdate, (state, acyion) => {
            state.isExpUpdated = true;
            state.isUserExpUpdated = true;
          });
          builder.addCase(updateExpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.expenseUpdated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isExpUpdated = false;
            state.isUserExpUpdated = false;
          });
          builder.addCase(updateExpAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.msg;
            state.serverErr = action?.error?.msg;
          });

          //delete
          //reset action
    builder.addCase(resetExpDelete,(state,action)=>{
      state.isExpDeleted = true;
  })
     builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
       state.isExpDeleted = false;
     });
 
     builder.addCase(deleteExpenseAction.rejected, (state, action) => {
       state.loading = false;
       state.appErr = action?.payload?.msg;
       state.serverErr = action?.error?.msg;
     });

   },  
});

export default expenseSlices.reducer;


