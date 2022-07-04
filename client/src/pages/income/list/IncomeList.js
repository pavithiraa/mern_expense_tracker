import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
//import { getAllExpAction } from '../../../redux/slices/expenses/expensesSlices'
import {useDispatch,useSelector} from "react-redux"
import AppPagination from '../../../components/AppPagination'
import LoadingComponent from '../../../components/Loading'
import ErrorDisplayMessage from '../../../components/ErrorDisplayMessage'
import './incomelist.css'
import { getAllIncomeAction } from '../../../redux/slices/income/incomeSlices'
import ContentDetails from '../../../components/ContentDetails'


const IncomeList = () => {
  const dispatch = useDispatch();
  const [page,setPage] =useState(1);
 
 //get all expenses
 const getall= useSelector(state=>state?.income);
 const {loading,appErr,serverErr,incomeList} = getall
 //console.log(loading,appErr,serverErr,incomeList);
 console.log("page",typeof(page));
   useEffect(()=>{
     dispatch(getAllIncomeAction(+page))
   },[dispatch,page,setPage])
  return (

    <>
  {loading ? <LoadingComponent/>: appErr || serverErr ? 
  <ErrorDisplayMessage>{serverErr} {appErr}</ErrorDisplayMessage> :  <div className='income_list'>
  <div className='income_top'>
        <h2 className='incomes_list_title'>Overall Income Transactions</h2>
        <p className='income_content'>This is the records of overall in transactions</p>
        <Link to="/add-income" className="btn  btn-primary me-2 m-2">
            New Income
          </Link>
       
  </div>
  <div className='income_bottom'>
  <table className="table table-hover">
          <thead>
            <tr className="table-primary ">
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Users</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Title</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Description</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Amount</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Date</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Edit</small>
                </button>
              </th>
              <th scope="col">
                <button className="btn incomes_button">
                  <small>Delete</small>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading?
             (<h1>Loading</h1>
              ): appErr || serverErr ?(
                <div>Err</div>
              ):incomeList?.docs?.length <= 0 ?(
                <div>No Income Found</div>
              ): (
                incomeList?.docs?.map(exp =>(
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
        pageNumber={incomeList?.totalPages}/>
      </div>
    
</div>}
  </>
    
  )
}

export default IncomeList