import React from "react";
import Login from "../Components/auth/Login";


const LoginPage: React.FC = (): JSX.Element => {
    return (
      <>
        <div className="component-container">
          <Login></Login>
        </div>
      </>
    );
  };

  export default LoginPage;