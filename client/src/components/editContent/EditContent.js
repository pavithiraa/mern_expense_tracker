import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./editexpense.css";
import DisabledButton from "../DisableButton";
import { updateExpAction } from "../../redux/slices/expenses/expensesSlices";
import { updateIncomeAction } from "../../redux/slices/income/incomeSlices";
import { useHistory } from "react-router-dom";

//form validations
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("amount is required"),
});

const EditContent = ({
  location: {
    state: { item },
  },
}) => {
  console.log(item);
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: item?.title,
      description: item?.description,
      amount: item?.amount,
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        id: item?._id,
      };

      item?.type === "income"
        ? dispatch(updateIncomeAction(data))
        : dispatch(updateExpAction(data));
    },
    validationSchema: formSchema,
  });

  //get data from store
  const expenseData = useSelector((state) => state.expenses);
  const { appErr, serverErr, loading, isExpUpdated} = expenseData;
  console.log(expenseData);

  const incomeData = useSelector((state)=> state.income);
  const { isIncUpdated} = incomeData;
  console.log(incomeData);


  useEffect(() => {
    if (isIncUpdated) history.push("/user-income");
  }, [isIncUpdated, dispatch]);

  useEffect(() => {
    if (isExpUpdated) history.push("/user-expenses");
  }, [isExpUpdated, dispatch]);

  return (
    <div className="editexp_container">
      <div className="editexp_content">
        <form className="editexp_form" onSubmit={formik.handleSubmit}>
          {appErr || serverErr ? <div>Err</div> : null}
          {item?.type === "income" ? (
                  <h2 className="editexp_title">Update Income</h2>
                ) : (
                  <h2 className="editexp_title">Update Expense</h2>
                )}
          <input
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            type="text"
            className="editexp_input"
            placeholder="Add the Title"
            autoFocus={true}
          />

          <div style={{backgroundColor:"lightgrey", color: "red", fontSize: "small" }}>
            {formik.touched.title && formik.errors.title}
          </div>

          <input
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            type="text"
            className="editexp_input"
            placeholder="Add the Description"
          />

          <div style={{ backgroundColor:"lightgrey",color: "red", fontSize: "small" }}>
            {formik.touched.description && formik.errors.description}
          </div>
          <input
            value={formik.values.amount}
            onChange={formik.handleChange("amount")}
            onBlur={formik.handleBlur("amount")}
            type="number"
            className="editexp_input"
            placeholder="Add the Amount"
          />

          <div style={{backgroundColor:"lightgrey", color: "red", fontSize: "small" }}>
            {formik.touched.amount && formik.errors.amount}
          </div>
          {loading ? (
            <DisabledButton />
          ) : (
            <button type="submit" className="btn btn-secondary">
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditContent;
