import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { authApi } from "../../libs/config/axios-instance";

const Details = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [subscriber, setSubscriber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscriber = async () => {
      setLoading(true);
      try {
        const response = await authApi.get(`/subscribers/history?userId=${userId}`);
        setSubscriber(response.data.data);
      } catch (error) {
        console.error("Error fetching subscriber history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSubscriber();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-md font-semibold text-seller_p hover:text-seller_p"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="flex flex-col items-center">
        <div className="p-6 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-white text-5xl shadow-md">
              <MdPerson />
            </div>
            <h2 className="text-xl font-semibold mt-4">{subscriber?.email || "N/A"}</h2>
          </div>
        </div>

        <div className="w-full mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead>
              <tr className="bg-gray-100">
                  <th className="text-start px-2 py-4 pl-10">Date</th>
                  <th className="text-start px-2 py-4">Status</th>
                  <th className="text-start px-2 py-4">Method</th>
                  <th className="text-start px-2 py-4">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriber?.subscription?.statusHistory?.length > 0 ? (
                  subscriber.subscription.statusHistory.map((history, index) => (
                    <tr key={index} className="text-center">
                      <td className="text-start px-2 py-4 pl-10">{new Date(history.date).toLocaleString()}</td>
                      <td className={`text-start px-2 py-4 ${
                 history.status === "active" ? "text-green-500" : history.status === "trial" ? "text-yellow-500" : "text-red-500"
                }`}>{history.status}</td>
                      <td className="text-start px-2 py-4">{history.paymentMethod}</td>
                      <td className="text-start px-2 py-4">{history.reason}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">No history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
