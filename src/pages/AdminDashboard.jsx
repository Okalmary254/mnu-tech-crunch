import React from "react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Site Metrics</h2>
          <p className="text-2xl font-bold text-blue-600">[Metrics Here]</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <p className="text-2xl font-bold text-green-600">[Categories Here]</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-2xl font-bold text-purple-600">[Users Here]</p>
        </div>
      </div>
      {/* Add more admin features as needed */}
    </div>
  );
};

export default AdminDashboard;
