import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { deleteExpenseAction } from "../redux/slices/expenses/expensesSlices";
import { deleteIncomeAction } from "../redux/slices/income/incomeSlices";
import currencyFormatter from "../utils/currencyFormatter";
import dateFormatter from "../utils/dateFormatter";

const ContentDetails = ({ item }) => {
  const location = useLocation();
  console.log(location.pathname);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = (values) => {
    const data = {
      ...values,
      id: item?._id,
    };
    item?.type === "income"
      ? dispatch(deleteIncomeAction(data))
      : dispatch(deleteExpenseAction(data));
  };

  const incomeData = useSelector((state) => state.income);
  const { isIncDeleted } = incomeData;

 

  const expenseData = useSelector((state) => state.expenses);
  const { isExpDeleted } = expenseData;

  useEffect(() => {
    if (isIncDeleted && isExpDeleted) return window.location.replace("/dashboard");
  }, [isIncDeleted,isExpDeleted, dispatch]);

  

  console.log("item", item.id);
  return (
    <>
      <tr>
        <th scope="row">
          {item?.user?.firstname} {item?.user?.lastname}
        </th>

        <td>{item?.title}</td>
        <td>{item?.description}</td>
        <td>{currencyFormatter("USD", item?.amount)}</td>
        <td>{item?.createdAt && dateFormatter(item?.createdAt)}</td>
        <td>
          <button
            // onClick={() => navigate(history, "edit", item)}
            onClick={() =>
              history.push({
                pathname: `/edit`,
                state: {
                  item,
                },
              })
            }
            className="badge bg-success-light text-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          </td>
          <td>
          <button
            onClick={handleDelete}
            className="badge bg-danger-light text-danger m-0 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};

export default ContentDetails;
