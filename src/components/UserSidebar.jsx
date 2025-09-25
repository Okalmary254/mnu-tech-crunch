import React from "react";

const UserSidebar = ({ onNav }) => (
  <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 shadow-lg flex flex-col py-10 px-4 z-20">
    <h2 className="text-2xl font-bold text-blue-800 mb-10 text-center tracking-tight">
      User Dashboard
    </h2>
    <nav className="flex flex-col gap-4">
      <button className="btn bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-3 justify-start w-full text-left font-semibold" onClick={() => onNav && onNav("profile")}>👤 Profile</button>
      <button className="btn bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-3 justify-start w-full text-left font-semibold" onClick={() => onNav && onNav("bookmarks")}>🔖 Bookmarks</button>
      <button className="btn bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex items-center gap-3 justify-start w-full text-left font-semibold" onClick={() => onNav && onNav("messages")}>💬 Messages</button>
      <button className="btn bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-3 justify-start w-full text-left font-semibold" onClick={() => onNav && onNav("settings")}>⚙️ Settings</button>
      <button className="btn bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-3 justify-start w-full text-left font-semibold" onClick={() => onNav && onNav("logout")}>🚪 Logout</button>
    </nav>
  </aside>
);

export default UserSidebar;
