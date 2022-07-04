import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//get accountstats action
export const getAccountStatsAction = createAsyncThunk(
  "account/get",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const user = getState()?.users?.userAuth;
    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.get(
        `${baseURL}/accounts-statistics`,
        config
      );

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
    name:"account",
    initialState:{},
    extraReducers:(builder)=>{
        //getall expenses
        builder.addCase(getAccountStatsAction.pending,(state,action)=>{
            state.loading = true;
        });

        builder.addCase(getAccountStatsAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.accountDetails= action?.payload;
            //to handle client-side error
            state.appErr= undefined;
            //to handle server-side error
            state.serverErr= undefined;
        });

        builder.addCase(getAccountStatsAction.rejected,(state,action)=>{
            state.loading=false;
             //to handle client-side error
            state.appErr= action?.payload?.msg;
            //to handle server-side error
            state.serverErr= action?.error?.msg;
        })
    }
});

export default expenseSlices.reducer;