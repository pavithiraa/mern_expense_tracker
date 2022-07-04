import React from "react";
import { useHistory } from "react-router-dom";
import currencyFormatter from "../../../../utils/currencyFormatter";

import "./userprofilestats.css";

const UserProfileStats = ({
  numOfTransExp,
  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransInc,
  avgInc,
  totalInc,
  minInc,
  maxInc,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="display_button">
        <div className="user_history">
          <h2 style={{ color: "red" }} className="history_title">
            Expense Transactions
          </h2>
          <h1
            style={{
              color: "red",
            }}
          >
            <span>{currencyFormatter("USD", totalExp)}</span>
          </h1>
          <div className="history_content">
            <p>
              Number of Transactions:
              <span className="history_exp">{numOfTransExp}</span>
            </p>
            <p>
              Minimum Transactions:<span className="history_exp">{minExp}</span>
            </p>
            <p>
              Maximum Transactions:<span className="history_exp">{maxExp}</span>
            </p>
            <p>
              Average Transactions:<span className="history_exp">{avgExp}</span>
            </p>
          </div>
          <button onClick={()=>history.push("/user-expenses")} type="button" className="btn btn-danger">
            View Expense History
          </button>
        </div>
        <div className="user_history">
          <h2 style={{ color: "blue" }} className="history_title">
            Income Transactions
          </h2>
          <h1 
            style={{
             color:"blue"
            }}
          >
            <span>{currencyFormatter("USD", totalInc)}</span>
          </h1>
          <div  className="history_content">
            <p>
              Number of Transactions:
              <span className="history_inc">{numOfTransInc}</span>
            </p>
            <p>
              Minimum Transactions<span className="history_inc">{minInc}</span>
            </p>
            <p>
              Maximum Transactions:<span className="history_inc">{maxInc}</span>
            </p>
            <p>
              Average Transactions:<span className="history_inc">{avgInc}</span>
            </p>
          </div>
          <button onClick={()=>history.push("/user-income")} type="button" className="btn btn-info">
            View Income History
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfileStats;
