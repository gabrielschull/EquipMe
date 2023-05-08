import React from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MyGear from "../Components/gear/MyGear";
import EditGear from "../Components/gear/EditGear";
import NavBar from "../Components/home/NavBar";
import AddGear from '../Components/gear/AddGear';




const MyGearPage: React.FC = (): JSX.Element => {
    return (
      <>
        <div className="component-container">
          <h1>Gear Details</h1>
          <MyGear/>
          <AddGear></AddGear>
          <EditGear></EditGear>
        </div>
      </>
    );
  };

  export default MyGearPage;