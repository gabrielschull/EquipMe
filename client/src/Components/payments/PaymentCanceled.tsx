import { useNavigate } from 'react-router-dom';
import NavBar from '../home/NavBar';

const PaymentCanceled: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
    <NavBar></NavBar>
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h4 className="text-2xl font-bold mb-4 text-center">
          Oops! Your payment has not been completed.
        </h4>
        <p className="text-lg mb-4 text-center">
          Please review card details and try again 💳
        </p>
        <p className="text-lg mb-4 text-center"></p>
        <div className="text-center">
          <button
            className="hover:bg-indigo-400 hover:text-white text-black px-4 py-2 rounded-md font-bold"
            onClick={() => navigate(`/home`)}>
            Back to GearHub
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentCanceled;
