import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import GraphData from "../../../components/GraphData/GraphData";
import LoadingComponent from "../../../components/Loading";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import calcTransaction from "../../../utils/accountStatistics";
import dateFormatter from "../../../utils/dateFormatter";
import UserProfileStats from "../UserProfile/UserProfileStats/UserProfileStats";
import "./profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const state = useSelector((state) => state.users);
  const { loading, serverErr, appErr,userAuth, profile } = state;

  //Get income statistics
  const incomeResult = profile?.income && calcTransaction(profile?.income);
  //Get expense statistics
  const expenseResult = profile?.expenses && calcTransaction(profile?.expenses);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {appErr} {serverErr}
        </ErrorDisplayMessage>
      ) : (
        <div className="profile-container">
          <div className="profile_left">
            <img
              className="profile_pic"
              src="https://cdn-icons-png.flaticon.com/512/992/992490.png?w=360"
              alt=""
            />
            <div className="profile_edit">
              <button onClick={()=>history.push({pathname:"user-edit",state:{
                user:userAuth
              }})} className="btn btn-primary">Edit Profile</button>
              <br />
              <div className="profile_details">
                <div className="profile_details_name">
                  {profile?.firstname}{" "}
                  {profile?.lastname}
                </div>
                <p className="profile_details_email">{profile?.email}</p>
                <p className="mb-0">Date Joined: {profile?.createdAt ? dateFormatter(profile?.createdAt) : <h1></h1>}</p>
                <div className="profile_details_record">
                  {profile?.expenses?.length + profile?.income?.length} Recordes
                  Created
                </div>
              </div>
            </div>
          </div>
          <div className="profile_right">
            <div className="profile_content">
              <div className="profile_chart">
                <GraphData
                  income={incomeResult?.sumTotal}
                  expense={expenseResult?.sumTotal}
                />
              </div>
              <UserProfileStats
            numOfTransExp={profile?.expenses?.length}
            avgExp={expenseResult?.avg}
            totalExp={expenseResult?.sumTotal}
            minExp={expenseResult?.min}
            maxExp={expenseResult?.max}
            numOfTransInc={profile?.income?.length}
            avgInc={incomeResult?.avg}
            totalInc={incomeResult?.sumTotal}
            minInc={incomeResult?.min}
            maxInc={incomeResult?.max}
          /> 
            </div>
          
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
