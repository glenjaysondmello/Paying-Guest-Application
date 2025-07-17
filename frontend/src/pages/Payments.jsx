import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogs } from "../features/payment/paymentSlice";

const Payments = () => {
  const dispatch = useDispatch();
  const { history, fetchPaymentsStatus, error } = useSelector(
    (store) => store.pay
  );

  useEffect(() => {
    dispatch(userLogs());
  }, [dispatch]);

  if (fetchPaymentsStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-xl">Loading payment history...</p>
      </div>
    );
  }

  if (fetchPaymentsStatus === "failed") {
    return (
      <div className="flex justify-center items-center h-screen">
        return{" "}
        <p className="text-red-600">
          Error: {error?.error || error || "Failed to fetch"}
        </p>
        ;
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Payment History
      </h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">
                  Payment ID
                </th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 truncate max-w-xs">
                    {payment.razorpay_payment_id}
                  </td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    ₹{payment.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payments;
