import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/user/settings/", {
      credentials: "include", // important if using session auth
    })
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setSaving(true);
    fetch("/api/user/settings/", {
      method: "POST", // or PUT depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(settings),
    })
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setSaving(false);
        alert("Settings updated successfully!");
      })
      .catch((err) => {
        console.error("Error saving settings:", err);
        setSaving(false);
      });
  };

  if (loading) return <p className="text-center">Loading settings...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={settings.username || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={settings.email || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={settings.phone || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Bio</label>
          <textarea
            name="bio"
            value={settings.bio || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Theme</label>
          <select
            name="theme"
            value={settings.theme || "light"}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
