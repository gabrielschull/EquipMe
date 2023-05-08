import React from "react";
import MyGear from "../Components/gear/MyGear";
import EditGear from './EditGear';
import NavBar from "../Components/home/NavBar";
import AddGear from './AddGear';

const MyGearPage: React.FC = (): JSX.Element => {
    return (
      <>
          <NavBar></NavBar>
          <MyGear/>
          <AddGear></AddGear>
          <EditGear></EditGear>
      </>
    );
  };

  export default MyGearPage;