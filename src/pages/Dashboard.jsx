import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSidebar from "../components/UserSidebar";

const Dashboard = () => {
  const [section, setSection] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    axios
      .get("/api/users/me/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar onNav={setSection} />
      <main className="flex-1 ml-60 px-4 md:px-8 py-10 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        {/* PROFILE SECTION */}
        {section === "profile" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Profile Overview</h2>
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="User avatar"
                className="w-24 h-24 rounded-full border"
              />
              <div>
                <p className="text-lg font-medium">{user.full_name}</p>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Joined: {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
            {user.bio && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2">About</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}
          </div>
        )}

        {/* BOOKMARKS SECTION (not implemented) */}
        {section === "bookmarks" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Bookmarks / Saved Posts
            </h2>
            <p className="text-gray-500">Bookmarks are not available.</p>
          </div>
        )}

        {/* MESSAGES SECTION (not implemented) */}
        {section === "messages" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Messages / Notifications
            </h2>
            <p className="text-gray-500">No new messages or notifications.</p>
          </div>
        )}

        {/* SETTINGS SECTION */}
        {section === "settings" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.full_name || ""}
                  onChange={(e) =>
                    setUser({ ...user, full_name: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={user.bio || ""}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avatar
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setUser({ ...user, avatar: e.target.files[0] })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* LOGOUT SECTION */}
        {section === "logout" && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Logout</h2>
            <p className="mb-4">Click the button below to logout.</p>
            <form action="/api/auth/logout/" method="post">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
