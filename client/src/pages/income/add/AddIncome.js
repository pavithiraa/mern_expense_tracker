import React, { useEffect } from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {useDispatch, useSelector} from "react-redux"
import "./addincome.css"
import { createIncomeAction } from '../../../redux/slices/income/incomeSlices'
import { useHistory } from "react-router-dom";
import DisabledButton from "../../../components/DisableButton";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";

//form validations
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
 amount:Yup.number().required("amount is required"),
})

const AddIncome = () => {
  const history = useHistory();
  //dispatch
  const dispatch= useDispatch();

  const formik = useFormik({
    initialValues:{
        title:"",
        description:"",
        amount:"",      
    },
   onSubmit: values=>{
    // console.log(values)
 dispatch(createIncomeAction(values))
   },
   validationSchema: formSchema,

});


  //get expense created from store
  const state = useSelector((state) => state.income);
  const { loading, appErr, serveErr,  isIncCreated } = state;

  //Redirect
  useEffect(() => {
    if (isIncCreated) history.push("/user-income");
  }, [isIncCreated, dispatch]);

  return (
    <div className='addinc_container'>
       <div className='addinc_content'>
            
           <div className='addinc_top'  >
                <div className='addinc_text'>Income</div>
               <h2 className='addinc_title'>Add New Income</h2> 
            </div>
               {/* err */}
        {serveErr || appErr ? (
          <ErrorDisplayMessage>
            {serveErr}
            {appErr}
          </ErrorDisplayMessage>
        ) : null}
          <form className='addinc_form' onSubmit={formik.handleSubmit}>
              <input 
              value={formik.values.title}
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
               type="text"
               className='addinc_input'
               placeholder='Add the Title' 
               autoFocus={true}/>

              <div style={{backgroundColor:"lightgrey",color:"red",fontSize:"small"}} >
                  {formik.touched.title && formik.errors.title}
              </div>

             <input 
              value={formik.values.description}
              onChange={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              type="text" 
              className='addinc_input' 
              placeholder='Add the Description'
              />

              <div style={{backgroundColor:"lightgrey",color:"red",fontSize:"small"}} >
                  {formik.touched.description && formik.errors.description}
              </div>

              <input 
              value={formik.values.amount}
              onChange={formik.handleChange('amount')}
              onBlur={formik.handleBlur('amount')}
              type="number" 
              className='addinc_input' 
              placeholder='Add the Amount'
              />

              <div style={{backgroundColor:"lightgrey",color:"red",fontSize:"small"}} >
                  {formik.touched.amount && formik.errors.amount}
              </div>
            
{ loading ? (
            <DisabledButton />
          ) :  ( <button type="submit" className='btn btn-primary'>Add Income</button>)}
           
          </form>
       </div>
    </div>
  )
}

export default AddIncome