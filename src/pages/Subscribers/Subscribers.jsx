import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { authApi } from "../../libs/config/axios-instance";
// import { toast } from "react-toastify";

const Subscribers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      try {
        const response = await authApi.get(`/subscribers/?page=${currentPage}&limit=6`);
        if (response.data.success) {
          setSubscribers(response.data.data.subscribers);
          setTotalPages(response.data.data.totalPages);
        } else {
          // toast.error("Failed to fetch subscribers");
        }
      } catch (error) {
        // toast.error("Error fetching subscribers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleViewTransaction = (id) => {
    navigate(`/admin/subscribers-details/${id}`);
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.includes(searchTerm) &&
    (filterStatus === "" || subscriber.subscription.status === filterStatus)
  );

  return (
    <div className="p-4">
    
      <h2 className="text-3xl font-semibold mb-4">Subscribers</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No subscribers found.</p>
      ) : (
        <>
          <div className="flex justify-between gap-4 mb-4">
            <div className="relative w-80">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search by email.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border w-full p-2 pl-10 rounded focus:outline-none focus:ring-2"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="cancelling">Cancelling</option>
            </select>
          </div>
          <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-[#f8f8f8]  rounded-t-xl">
          <tr className="bg-gray-100 font-medium">
          <th className="px-2 py-4 text-start text-[#8E95A9] pl-8 ">Email</th>
              <th className="px-2 py-4 text-start text-[#8E95A9] ">Subscription Type</th>
              <th className="px-2 py-4 text-start text-[#8E95A9] ">Status</th>
              <th className="px-2 py-4  text-[#8E95A9] ">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map((sub) => (
                <tr key={sub._id} className="text-center">
                          <td className="px-2 py-4 text-[#555F7E] pl-8 text-start">{sub.email}</td>
                <td className="px-2 py-4 text-[#555F7E] text-start">{sub.subscription.type}</td>
                <td className="px-2 py-4 text-[#555F7E] text-start">{sub.subscription.status}</td>
                <td className="px-2 py-4 text-[#555F7E] ">
                  <button
                    onClick={() => handleViewTransaction(sub._id)}
                    className="bg-[#6D68FB] cursor-pointer text-white px-3 py-2 rounded hover:bg-[#6D68FB]"
                  >
                    View Transactions
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscribers;
