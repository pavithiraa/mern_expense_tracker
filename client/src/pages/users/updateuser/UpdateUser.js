import React, { useEffect } from 'react'
import "./updateuser.css"
import {useFormik} from "formik"
import * as Yup from "yup"
import DisabledButton from '../../../components/DisableButton'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateProfileAction } from '../../../redux/slices/users/usersSlices'
import LoadingComponent from '../../../components/Loading'
import ErrorDisplayMessage from '../../../components/ErrorDisplayMessage'



//form validations
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    firstname:Yup.string().required("First Name is required"),
    lastname:Yup.string().required("Last Name is required")
  })

const UpdateUser = ({ location: { state } }) => {
  console.log(state);
  //history
  const history = useHistory();
  //get data from store
  const user = useSelector(state => state?.users);
  const { userAppErr, userServerErr, userLoading, isEdited } = user;
  
  //dispatch
  const dispatch = useDispatch();
  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email,
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
    },

    onSubmit: values => {
      dispatch(updateProfileAction(values));
    },
    validationSchema: formSchema,
  });

  //redirect
  useEffect(() => {
    if (isEdited) history.push("/profile");
  }, [isEdited, dispatch]);

  return (
    <>
    {userAppErr || userServerErr ? (<ErrorDisplayMessage>{userServerErr} {userAppErr}</ErrorDisplayMessage>) :     <div className='update_user'>
           <div className='update_container'>
            <h4 className='update_title' >  Hi, {state?.user?.firstname} Do you want to update your
                    profile</h4>

                    {/* Err */}
            <form
            className='update_form' 
            onSubmit={formik.handleSubmit}
            >    
        <input 
        value={formik.values.firstname}
        onChange={formik.handleChange('firstname')}
        onBlur={formik.handleBlur('firstname')}
        type="text"
        className='update_input'
        placeholder='Enter firstname'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.firstname && formik.errors.firstname}
        </div>


        <input 
        value={formik.values.lastname}
        onChange={formik.handleChange('lastname')}
        onBlur={formik.handleBlur('lastname')}
        type="text"
        className='update_input'
        placeholder='Enter lastname'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.lastname && formik.errors.lastname}
        </div>

        <input 
        value={formik.values.email}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        type="email"
        className='update_input'
        placeholder='Enter email'/>

        <div style={{backgroundColor:"lightgrey",color:"red",textAlign:"center"}} >
            {formik.touched.email && formik.errors.email}
        </div>

       <div className='update_button'>
        {userLoading ? 
        <DisabledButton/> : 
      <button className='btn btn-warning' type="submit">Update</button>
        }
        </div>

           </form>
           </div>
    </div>}
    </>

  )
}

export default UpdateUser