import React from "react";
const NotAdmin = () => {
  return (
    <div
      style={{

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "calc(100vh - 70px)"
      }}
    >
      <h1 className="not_admin" style={{color:"red"}}>You are not an admin</h1>
      <img  src="https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png" alt="NotAdmin"
       className="admin_img" style={{borderRadius:"50%",height:"400px",width:"450px",marginTop:"10px"}}/>
    </div>
  );
};

export default NotAdmin;