import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import GraphData from "../../../components/GraphData/GraphData";
import LoadingComponent from "../../../components/Loading";
import { getAccountStatsAction } from "../../../redux/slices/accountsStats/accountStatSlices";
import currencyFormatter from "../../../utils/currencyFormatter";

import "./dashboard.css";

const DashBoard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountStatsAction());
  }, [dispatch]);

  const account = useSelector((state) => state.account);
  const { loading, appErr, serverErr, accountDetails } = account;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <div className="dashboard-container">
          <div className="dasbboard_content">

            <div className="dashboard_chart">
              <GraphData
                income={accountDetails?.incomeStats[0]?.totalIncome}
                expense={accountDetails?.expenseStats[0]?.totalExp}
              />
            </div>
            <div className="display_button">
              <div className="history">
                <h2 className="dasboard_exp">Total Expense</h2>
                <h1
                  style={{
                    backgroundColor: "white",
                    padding: "7px",
                    borderRadius: "5px",
                    color: "red",
                  }}
                >
                  <span>
                    {currencyFormatter(
                      "USD",
                      accountDetails?.expenseStats[0]?.totalExp
                    )}
                  </span>
                </h1>
                <div>
                  <p>
                    Number of Transactions:
                    <span className="dasboard_exp">
                      {accountDetails?.expenseStats[0]?.totalRecExp}
                    </span>
                  </p>
                  <p>
                    Minimum Transactions:
                    <span className="dasboard_exp">
                      {accountDetails?.expenseStats[0]?.minExp}
                    </span>
                  </p>
                  <p>
                    Maximum Transactions:
                    <span className="dasboard_exp">
                      {accountDetails?.expenseStats[0]?.maxExp}
                    </span>
                  </p>
                  <p>
                    Average Transactions:
                    <span className="dasboard_exp">
                      {accountDetails?.expenseStats[0]?.averageExp}
                    </span>
                  </p>
                </div>
                <button onClick={()=>history.push("/expenses")} type="button" className="btn btn-danger">
                Overall Expense History
                </button>
              </div>
              <div className="history">
                <h2 className="dasboard_inc">Total Income</h2>
                <h1
                  style={{
                    backgroundColor: "white",
                    padding: "7px",
                    borderRadius: "5px",
                    color: "blue",
                  }}
                >
                  <span style={{ color: "blue" }}>
                    {currencyFormatter(
                      "USD",
                      accountDetails?.incomeStats[0]?.totalIncome
                    )}
                  </span>
                </h1>
                <div>
                  <p>
                    Number of Transactions:
                    <span className="dasboard_inc">
                      {accountDetails?.incomeStats[0]?.totalRecIncome}
                    </span>
                  </p>
                  <p>
                    Minimum Transactions:
                    <span className="dasboard_inc">
                      {accountDetails?.incomeStats[0]?.minIncome}
                    </span>
                  </p>
                  <p>
                    Maximum Transactions:
                    <span className="dasboard_inc">
                      {accountDetails?.incomeStats[0]?.maxIncome}
                    </span>
                  </p>
                  <p>
                    Average Transactions:
                    <span className="dasboard_inc">
                      {accountDetails?.incomeStats[0]?.averageIncome}
                    </span>
                  </p>
                </div>
                <button onClick={()=>history.push("/incomes")}type="button" className="btn btn-info">
                  Overall Income History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
