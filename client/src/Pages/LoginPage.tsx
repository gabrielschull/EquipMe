import React from "react";
import {useNavigate} from "react-router-dom"
import Login from "../Components/auth/Login";
// import Signup from "../Components/auth/Signup";

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