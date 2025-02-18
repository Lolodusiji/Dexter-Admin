import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Onboard/Login";
import Subscribers from "./pages/Subscribers/Subscribers";
import Payment from "./pages/Payments/Payment";
import Roles from "./pages/Roles/Roles";
import Logs from "./pages/AdminLogs/Logs";
import Details from "./pages/Subscribers/Details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="subscribers-details/:id" element={<Details />} />
          <Route path="payments" element={<Payment />} />
          <Route path="roles" element={<Roles />} />
          <Route path="logs" element={<Logs />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
