import React, { useState } from "react";

const Roles = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [subscribersPermission, setSubscribersPermission] = useState("view");
  const [paymentsPermission, setPaymentsPermission] = useState("view");
  const [staffList, setStaffList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStaff = {
      email,
      role,
      permissions: {
        subscribers: subscribersPermission,
        payments: paymentsPermission,
      },
      date: new Date().toLocaleString(),
    };
    setStaffList([...staffList, newStaff]);
    setEmail("");
    setRole("admin");
    setSubscribersPermission("view");
    setPaymentsPermission("view");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Staff</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
            <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <h3 className="text-lg font-semibold mb-2">Permissions</h3>
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor="subscribers"
              className="block text-md font-medium text-gray-700"
            >
              Subscribers:
            </label>
            <select
              id="subscribers"
              value={subscribersPermission}
              onChange={(e) => setSubscribersPermission(e.target.value)}
              className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
            >
            <option value="">Select option</option>
              <option value="no_access">No Access</option>
              <option value="read_access">Read Access</option>
              <option value="full_access">Full Access</option>
            </select>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label
              htmlFor="payments"
              className="block text-md font-medium text-gray-700"
            >
              Payments:
            </label>
            <select
              id="payments"
              value={paymentsPermission}
              onChange={(e) => setPaymentsPermission(e.target.value)}
              className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
            >
            <option value="">Select option</option>
              <option value="no_access">No Access</option>
              <option value="read_access">Read Access</option>
              <option value="full_access">Full Access</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 cursor-pointer bg-[#6D68FB] text-white font-semibold py-2 px-4 rounded"
          >
            Add Staff
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Staff List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Permissions</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{staff.email}</td>
                  <td className="py-2 px-4 border-b">{staff.role}</td>
                  <td className="py-2 px-4 border-b">
                    Subscribers: {staff.permissions.subscribers}, Payments:{" "}
                    {staff.permissions.payments}
                  </td>
                  <td className="py-2 px-4 border-b">{staff.date}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Roles;
