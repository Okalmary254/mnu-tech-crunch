import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar";

const Dashboard = () => {
  const [section, setSection] = useState("profile");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar onNav={setSection} />
      <main className="flex-1 ml-60 px-4 md:px-8 py-10 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        {section === "profile" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            {/* TODO: Fetch and display user profile info here */}
            <p>Profile info goes here.</p>
          </div>
        )}
        {section === "bookmarks" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bookmarks / Saved Posts</h2>
            {/* TODO: List user's saved posts */}
            <p>Bookmarked posts will appear here.</p>
          </div>
        )}
        {section === "messages" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Messages / Notifications</h2>
            {/* TODO: List user messages/notifications */}
            <p>Messages and notifications will appear here.</p>
          </div>
        )}
        {section === "settings" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            {/* TODO: User settings form */}
            <p>Settings form goes here.</p>
          </div>
        )}
        {section === "logout" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Logout</h2>
            {/* TODO: Implement logout logic */}
            <p>Click the button below to logout.</p>
            <form action="/api/auth/logout/form/" method="post">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4">Logout</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
