import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { getAllExpAction } from '../../../redux/slices/expenses/expensesSlices'
import {useDispatch,useSelector} from "react-redux"
import ContentDetails from '../../../components/ContentDetails'
import AppPagination from '../../../components/AppPagination'
import LoadingComponent from '../../../components/Loading'
import ErrorDisplayMessage from '../../../components/ErrorDisplayMessage'
import './expenselist.css'


const ExpensesList = () => {
  const dispatch = useDispatch();
 const [page,setPage] =useState(1);

//get all expenses
const getall= useSelector(state=>state?.expenses);
const {loading,appErr,serverErr,expensesList} = getall
//console.log(loading,appErr,serverErr,expensesList);
console.log("page",typeof(page));
  useEffect(()=>{
    dispatch(getAllExpAction(+page))
  },[dispatch,page,setPage])


  return (
  <>
  {loading ? <LoadingComponent/>: appErr || serverErr ? 
  <ErrorDisplayMessage>{serverErr} {appErr}</ErrorDisplayMessage> :  <div className='expenses_list'>
  <div className='expense_top'>
        <h2 className='expenses_list_title'>Overall Expense Transactions</h2>
        <p className='expense_content'>This is the records of overall expenses transactions</p>
        <Link to="/add-expense" className="btn  btn-danger me-2 m-2">
            New Expense
          </Link>
       
  </div>
  <div className='expense_bottom'>
  <table className="table table-hover">
          <thead>
            <tr className="table-danger ">
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Users</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Title</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Description</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Amount</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Date</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Edit</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn expenses_button">
                  <small>Delete</small>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading?
             (<div>Loading</div>
              ): appErr || serverErr ?(
                <div>Err</div>
              ):expensesList?.docs?.length <= 0 ?(
                <div>No Expense Found</div>
              ): (
                expensesList?.docs?.map(exp =>(
                 <ContentDetails item={exp} key={exp?._id}/>
                ))
              )
            }</tbody>
        </table>
  </div>
  <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <AppPagination
        setPage={setPage}
        pageNumber={expensesList?.totalPages}/>
      </div>
    
</div>}
  </>
  )
}

export default ExpensesList