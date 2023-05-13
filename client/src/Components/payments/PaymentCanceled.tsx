import { useNavigate } from 'react-router-dom';

const PaymentCanceled: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={() => navigate(`/home`)}>
            Go to Home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
