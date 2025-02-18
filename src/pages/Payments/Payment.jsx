import { useState, useEffect } from "react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { authApi } from "../../libs/config/axios-instance";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllPayments = async () => {
      setLoading(true);
      try {
        const { data: { data } } = await authApi.get(`/subscribers/payment/?page=${currentPage}&limit=10`);
        setPayments(data.payments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPayments();
  }, [currentPage]);

  const handleDownloadCSV = async () => {
    setLoading(true);
    try {
      const response = await authApi.get(`/subscribers/export/csv`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "payments.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const response = await authApi.get(`/subscribers/export/pdf`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "payments.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-semibold">Payments</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading Transaction History...</p>
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No subscribers found.</p>
      ) : (
        <>
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by subscriber, email, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-full p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadCSV} 
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <FaFileCsv />
            Download CSV
          </button>
          <button 
            onClick={handleDownloadPDF} 
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaFilePdf />
            Download PDF
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-[#8E95A9]">
              <th className="border text-start border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Method</th>
              <th className="border border-gray-300 p-2">Invoice</th>
              <th className="border text-start border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((txn) => (
              <tr key={txn.id} className="text-center text-[#555F7E]">
                <td className="border text-start border-gray-300 p-2">{txn.subscriberEmail}</td>
                <td className="border border-gray-300 p-2">{txn.paymentAmount}</td>
                <td className="border border-gray-300 p-2">{txn.paymentMethod}</td>
                <td className="border border-gray-300 p-2">{txn.invoiceDetails?.invoiceId || "N/A"}</td>
                <td className={`border text-start border-gray-300 p-2 ${
                  txn.paymentStatus === "active" ? "text-green-500" : txn.paymentStatus === "trial" ? "text-yellow-500" : "text-red-500"
                }`}>{txn.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
}
