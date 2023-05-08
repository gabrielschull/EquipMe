import React from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import GearDetails from "../Components/gear/GearDetails";
import NavBar from "../Components/home/NavBar";

const GearDetailsPage: React.FC = (): JSX.Element => {
    return (
      <>
        <div className="component-container">
          <h1>Gear Details</h1>
          <NavBar></NavBar>
          <GearDetails></GearDetails>
        </div>
      </>
    );
  };

  export default GearDetailsPage;