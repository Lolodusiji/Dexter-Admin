import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { authApi } from "../../libs/config/axios-instance";

const Logs = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
      const fetchLogs = async () => {
        setLoading(true);
        try {
          const response = await authApi.get(`/subscribers/admin/logs?page=${currentPage}&limit=10&fromDate=2024-02-14&endDate=2027-02-14`);
          if (response.data.success) {
            setLogs(response.data.data.auditLogs);
            setTotalPages(response.data.data.pagination.totalPages);
          }
        } catch (error) {
          console.error("Error fetching logs", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLogs();
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
  
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Admin Logs</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading Logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No Logs found.</p>
      ) : (
        <>
          <div className="relative w-80 mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by email.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border w-full p-2 pl-10 rounded focus:outline-none focus:ring-2"
            />
          </div>
          <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-[#f8f8f8] rounded-t-xl">
              <tr className="bg-gray-100 font-medium">
                <th className="px-2 py-4 text-start text-[#8E95A9] pl-8">User Email</th>
                <th className="px-2 py-4 text-start text-[#8E95A9]">Authored By</th>
                <th className="px-2 py-4 text-start text-[#8E95A9]">Changes</th>
                <th className="px-2 py-4 text-start text-[#8E95A9]">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log, index) => (
                <tr key={index} className="text-center">
                  <td className="px-2 py-4 text-[#555F7E] pl-8 text-start">{log.userEmail}</td>
                  <td className="px-2 py-4 text-[#555F7E] text-start">{log.authoredBy}</td>
                  <td className="px-2 py-4 text-[#555F7E] text-start">
                    {log.changes.map((change, idx) => (
                      <div key={idx} className="mb-2">
                        <span className="font-semibold">{change.field}: </span>
                        <span className="text-red-500 line-through">{JSON.stringify(change.oldValue)}</span>
                        <span className="ml-2 text-green-500">{JSON.stringify(change.newValue)}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-2 py-4 text-[#555F7E] text-start">{new Date(log.createdAt).toLocaleString()}</td>
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

export default Logs;
