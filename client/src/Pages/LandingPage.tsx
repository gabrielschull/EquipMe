import React from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import NavBar from "../Components/home/NavBar";
import Chat from "../Components/rentals/Chat";
import GettingStarted from "../Components/auth/GettingStarted";

const LandingPage: React.FC = (): JSX.Element => {
    return (
      <>
        <div className="component-container">
          <h1>Landing Page</h1>
          <NavBar></NavBar>
          <GettingStarted></GettingStarted>
          <Chat></Chat>
        </div>
      </>
    );
  };

  export default LandingPage;