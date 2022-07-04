import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useFormik} from "formik"
import {useDispatch,useSelector} from "react-redux"
import * as Yup from "yup"
import { loginUserAction } from '../../../redux/slices/users/usersSlices'
import DisabledButton from '../../../components/DisableButton'
import { useHistory} from "react-router-dom";
import "./login.css"



//form validations
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
})

const Login = () => {
    //dispatch
    const dispatch= useDispatch();
    let history = useHistory();
    
    //get data from store
    const user = useSelector(state => state?.users);
    const {userAppErr,userServerErr,userLoading,userAuth}= user;
    
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
       onSubmit: values=>{
           dispatch(loginUserAction(values))
       },
       validationSchema: formSchema,

    });
//redirect
useEffect(()=>{
   if(userAuth) { 
     history.push("/profile");
    }
},[userAuth])

  return (
    <div className='login'>
      <div className='login_container'>
      <div style={{textAlign:"center"}}> Sign-in</div>
      <h2 className='login_title'>Login</h2>


      {userAppErr || userServerErr ? <div  style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}}>{userServerErr || userAppErr}</div>: null}
      <form className='login_form' onSubmit={formik.handleSubmit}>

       
        <input 
        value={formik.values.email}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        type="email"
        className='login_input'
        placeholder='Enter your email'/>


        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.email && formik.errors.email}
        </div>

        
        <input 
        value={formik.values.password}
        onChange={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        type="password"
        className='login_input'
        placeholder='Enter your password'/>

<div style={{color:"red",textAlign:"center"}} >
            {formik.touched.password && formik.errors.password}
        </div>


        <div className='log_button'>
          {userLoading ? <DisabledButton/> : <button className='btn btn-success' type="submit">Login</button>}
        
        </div>

      </form>
     </div>
    </div>
  )
}

export default Login