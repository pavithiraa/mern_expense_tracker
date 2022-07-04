import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../../../redux/slices/users/usersSlices";
import "./userprofileexplist.css";
import LoadingComponent from "../../../../components/Loading";
import ErrorDisplayMessage from "../../../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "../UserProfileContentDetails";

const UserProfileExpList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  //states
  const state = useSelector((state) => state.users);
  const { loading, serverErr, appErr, profile } = state;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <>
          <div className="expense_list">
            <h6 className="expense_list_tilte">Recent Expense transactions</h6>
            <p>Below is the history of your expense transactions records</p>
            <Link to="/add-expense" className="btn btn-danger m-2">
              New Expense
            </Link>
          </div>
          <table className="table table-hover">
            <thead>
              <tr className="table-danger">
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Title</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Description</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Amount</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Date</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Edit</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Delete</small>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {profile?.expenses?.length <= 0 ? (
                  <h2>No Expense Found</h2>
                ) : (
                  profile?.expenses?.map((exp) => (
                    <UserProfileContentDetails item={exp} key={exp?._id} />
                  ))
                )}
              </>
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default UserProfileExpList;
