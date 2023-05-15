const PaymentSuccessful: React.FC = (): JSX.Element => {
  return (
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
      </div>
    </div>
  );
};

export default PaymentSuccessful;
