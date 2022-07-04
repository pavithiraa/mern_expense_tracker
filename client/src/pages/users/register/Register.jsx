import React, { useEffect } from 'react'
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import * as Yup from "yup"
import { Link, useHistory } from 'react-router-dom'
import { registerUserAction } from '../../../redux/slices/users/usersSlices'
import DisabledButton from '../../../components/DisableButton'
import "./register.css"



//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname:Yup.string().required("First Name is required"),
  lastname:Yup.string().required("Last Name is required")
})

const Register = () => {

    //dispatch
    const dispatch= useDispatch();
    const history = useHistory();

    const user = useSelector(state => state?.users);
    const {userAppErr,userServerErr,userLoading,isRegistered}= user;
    
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            firstname:"",
            lastname:""
        },
       onSubmit: values=>{
         console.log(values)
           dispatch(registerUserAction(values))
       },
       validationSchema: formSchema,

    });
    //redirect
useEffect(()=>{
  if(isRegistered) { 
    history.push("/login");
   }
},[isRegistered])

  return (
    <div className='register'>
    
      <div className='register_container'>   
        <div style={{textAlign:"center"}}> new user?</div>
      <h2 className='register_title'>Register</h2>
      {userAppErr || userServerErr ? <div  style={{color:"red",textAlign:"center"}}>{userServerErr || userAppErr}</div>: null}
      <form className='register_form' onSubmit={formik.handleSubmit}>

     
        <input 
        value={formik.values.firstname}
        onChange={formik.handleChange('firstname')}
        onBlur={formik.handleBlur('firstname')}
        type="text"
        className='register_input'
        placeholder='Enter your firstname'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.firstname && formik.errors.firstname}
        </div>


        <input 
        value={formik.values.lastname}
        onChange={formik.handleChange('lastname')}
        onBlur={formik.handleBlur('lastname')}
        type="text"
        className='register_input'
        placeholder='Enter your lastname'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.lastname && formik.errors.lastname}
        </div>

        <input 
        value={formik.values.email}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        type="email"
        className='register_input'
        placeholder='Enter your email'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.email && formik.errors.email}
        </div>

     
        <input 
         value={formik.values.password}
         onChange={formik.handleChange('password')}
         onBlur={formik.handleBlur('password')}
        type="password"
        className='register_input'
        placeholder='Enter your password'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.password && formik.errors.password}
        </div>

        <div className='reg_button'>
        {userLoading ? <DisabledButton/> : <button className='btn btn-success' type="submit">Register</button>}
        </div>

      </form>
     </div> 
    </div>
  )
}

export default Register