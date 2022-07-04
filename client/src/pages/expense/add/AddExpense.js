import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpAction } from "../../../redux/slices/expenses/expensesSlices";
import { useDispatch, useSelector } from "react-redux";
import "./addexpense.css";
import { useHistory } from "react-router-dom";
import DisabledButton from "../../../components/DisableButton";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";

//form validations
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("amount is required"),
});

const AddExpense = () => {
  const history = useHistory();
  //dispatch
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      //  console.log(values)
      dispatch(createExpAction(values));
    },
    validationSchema: formSchema,
  });

  //get expense created from store
  const state = useSelector((state) => state.expenses);
  const { loading, appErr, serveErr,  isExpCreated } = state;

  //Redirect
  useEffect(() => {
    if (isExpCreated) history.push("/user-expenses");
  }, [isExpCreated, dispatch]);

  return (
    <div className="addexp_container">
      <div className="addexp_content">
        <div className="addexp_top">
          <div className="addexp_text">Expense</div>
          <h2 className="addexp_title">Add New Expense</h2>
        </div>
        {/* err */}
        {serveErr || appErr ? (
          <ErrorDisplayMessage>
            {serveErr}
            {appErr}
          </ErrorDisplayMessage>
        ) : null}
        <form className="addexp_form" onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            type="text"
            className="addexp_input"
            placeholder="Add the Title"
            autoFocus={true}
          />

          <div style={{ backgroundColor:"lightgrey",color: "red", fontSize: "small" }}>
            {formik.touched.title && formik.errors.title}
          </div>

          <input
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            type="text"
            className="addexp_input"
            placeholder="Add the Description"
          />

          <div style={{backgroundColor:"lightgrey", color: "red", fontSize: "small" }}>
            {formik.touched.description && formik.errors.description}
          </div>

          <input
            value={formik.values.amount}
            onChange={formik.handleChange("amount")}
            onBlur={formik.handleBlur("amount")}
            type="number"
            className="addexp_input"
            placeholder="Add the Amount"
          />

          <div style={{ backgroundColor:"lightgrey",color: "red", fontSize: "small" }}>
            {formik.touched.amount && formik.errors.amount}
          </div>

          {loading ? (
            <DisabledButton />
          ) : (
            <button type="submit" className="btn btn-danger">
              Add Expense
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
