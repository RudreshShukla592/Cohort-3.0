import React, { useContext, useEffect, useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import CashFlowCard from "../components/CashFlowCard";
import TransactionsCard from "../components/TransactionsCard";
import useApi from "../../../auth/api/authApi";
import SummaryCards from "../components/SummaryCards";
import { MyStore } from "../../../../app/context/MyContext";
import TransactionForm from "../components/TransactionForm";

const Dashboard = () => {
  const api = useApi();
  const {user} = useContext(MyStore)

  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, transactionsResponse] = await Promise.all([
        api.get("/transactions/dashboard"),
        api.get("/transactions/getAll?limit=5"),
      ]);

      setDashboard(dashboardResponse.data.data);

      setTransactions(transactionsResponse.data.data || []);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoaderCircle size={30} className="animate-spin text-[#101b32]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-xl p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-[#4f7fc4] mb-1">
            Financial Overview
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "there"}
          </h1>

          <p className="text-sm text-[#8792a8] mt-2">
            Here's a quick look at your money today.
          </p>
        </div>

        <TransactionForm/>
      </div>

      {/* Summary */}
      <SummaryCards dashboard={dashboard} />

      {/* Graph */}
      <CashFlowCard graph={dashboard.graph} />

      {/* Transactions */}
      <TransactionsCard transactions={transactions} />
    </section>
  );
};

export default Dashboard;
