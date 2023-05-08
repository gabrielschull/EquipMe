import React from "react";
import MyGear from "../Components/gear/MyGear";
import EditGear from "../Components/gear/EditGear";
import NavBar from "../Components/home/NavBar";
import AddGear from '../Components/gear/AddGear';

const MyGearPage: React.FC = (): JSX.Element => {
    return (
      <>
          <MyGear/>
          <EditGear></EditGear>
      </>
    );
  };

  export default MyGearPage;