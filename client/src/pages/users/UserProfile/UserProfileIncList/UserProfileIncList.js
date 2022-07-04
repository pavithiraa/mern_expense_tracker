import React, { useEffect } from "react";
import "./userprofileinclist.css";
import { Link } from "react-router-dom";
import { userProfileAction } from "../../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../../components/Loading";
import ErrorDisplayMessage from "../../../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "../UserProfileContentDetails";

const UserProfileIncList = () => {
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
          <div className="incomes_list">
            <h6 className="incomes_list_tilte">Recent income transactions</h6>
            <p>Below is the history of your income transactions records</p>
            <Link to="/add-income" className="btn  btn-primary m-2">
              New Income
            </Link>
          </div>
          <table className="table hover">
            <thead>
              <tr className="table-primary">
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
              {profile?.income?.length <= 0 ? (
                <h2>No Income Found</h2>
              ) : (
                profile?.income?.map((inc) => (
                  <UserProfileContentDetails item={inc} key={inc?._id} />
                ))
              )}
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

export default UserProfileIncList;
