import { useNavigate } from "react-router-dom";
import NavBar from "../home/NavBar";

const PaymentSuccessful: React.FC = (): JSX.Element => {

  const navigate = useNavigate()

  return (
    <>
    <NavBar></NavBar>
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          🏂 Thank you for choosing my gear! 🏄🏽‍♂️
        </h2>
        <h4 className="text-lg mb-4 text-center">
          Your payment was successful and your gear is now reserved.
        </h4>
        <p className="text-sm text-center">
          If you have any questions or concerns, please don't hesitate to reach
          out.
        </p>
        <button
            className="hover:bg-indigo-400 hover:text-white text-black px-4 py-2 rounded-md font-bold m-5 ml-44"
            onClick={() => navigate(`/home`)}>
            Back to GearHub
          </button>
      </div>
    </div>
    </>
  );
};

export default PaymentSuccessful;
