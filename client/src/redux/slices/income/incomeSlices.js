import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//create action for redirect to reset the data after created..
export const resetIncCreated = createAction('income/created/reset')
export const resetIncUpdate = createAction('income/update/reset')
export const resetIncDelete = createAction('income/delete/reset')

//create action
export const createIncomeAction = createAsyncThunk(
  "income/create",
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
      const { data } = await axios.post(`${baseURL}/income`, payload, config);
 //dispatch
 dispatch(resetIncCreated());
 
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get all action
export const getAllIncomeAction = createAsyncThunk(
  "income/get",
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
      const { data } = await axios.get(
        `${baseURL}/income?page=${payload}`,
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

//update expense

export const updateIncomeAction = createAsyncThunk(
  "income/update",
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
        `${baseURL}/income/${payload?.id}`,
        payload,
        config
      );
       dispatch(resetIncUpdate());
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
export const deleteIncomeAction = createAsyncThunk(
  `income/delete`,
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
        `${baseURL}/income/${payload?.id}`,
        config
      );
      dispatch(resetIncDelete());
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
const incomeSlices = createSlice({
  name: "income",
  initialState: {},
  extraReducers: (builder) => {
    //create expense
    builder.addCase(createIncomeAction.pending, (state, action) => {
      state.loading = true;
    });
//reset action
builder.addCase(resetIncCreated,(state,action)=>{
  state.isIncCreated = true;
 })
    builder.addCase(createIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      //to handle client-side error
      state.appErr = undefined;
      //to handle server-side error
      state.serverErr = undefined;
      state.isIncCreated = false;
    });

    builder.addCase(createIncomeAction.rejected, (state, action) => {
      state.loading = false;
      //to handle client-side error
      state.appErr = action?.payload?.msg;
      //to handle server-side error
      state.serverErr = action?.error?.msg;
    });

    //getall expenses
    builder.addCase(getAllIncomeAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAllIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeList = action?.payload;
      //to handle client-side error
      state.appErr = undefined;
      //to handle server-side error
      state.serverErr = undefined;
    });

    builder.addCase(getAllIncomeAction.rejected, (state, action) => {
      state.loading = false;
      //to handle client-side error
      state.appErr = action?.payload?.msg;
      //to handle server-side error
      state.serverErr = action?.error?.msg;
    });

    //update expenses
    builder.addCase(updateIncomeAction.pending, (state, action) => {
      state.loading = true;
    });
   // reset action
      builder.addCase(resetIncUpdate, (state, action) => {
        state.isIncUpdated = true;
       state.isIncListUpdated= true;
      });
    builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
      state.Incloading = false;
      state.incomeUpdated = action?.payload;
      state.IncappErr = undefined;
      state.IncserverErr = undefined;
      state.isIncUpdated = false;
      state.isIncListUpdated= false;
    });
    builder.addCase(updateIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
    //delete

    //reset action
    builder.addCase(resetIncDelete,(state,action)=>{
     state.isIncDeleted = true;
 })
    builder.addCase(deleteIncomeAction.fulfilled, (state, action) => {
      state.isIncDeleted = false;
    });

    builder.addCase(deleteIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default incomeSlices.reducer;
