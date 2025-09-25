/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { posts as initialPosts } from "../data";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState({
    email: "admin@site.com",
    password: "admin123",
    name: "Jean Marie",
    bio: "Data scientist.",
    profileImage: "https://ui-avatars.com/api/?name=Admin+User",
  });
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const fileInputRef = useRef();

  // Admin settings
  const handleAdminChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdmin((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    alert("Admin settings updated!");
  };

  // Add/Edit Post
  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    const newAddedPost = {
      ...newPost,
      id: Date.now(),
      author: admin.name,
      date: new Date().toLocaleString(),
      excerpt: newPost.content.slice(0, 60) + "...",
    };
    const updatedPosts = [...posts, newAddedPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setNewPost({ title: "", content: "", image: "", category: "" });
    setImageFile(null);
  };
  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost(post);
  };
  const handleUpdatePost = (e) => {
    e.preventDefault();
    const updated = posts.map((p) =>
      p.id === editingPost.id ? { ...editingPost, ...newPost } : p
    );
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
    setEditingPost(null);
    setNewPost({ title: "", content: "", image: "", category: "" });
  };
  const handleDeletePost = (id) => {
    if (window.confirm("Delete this post?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem("posts", JSON.stringify(updated));
    }
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    if (!search) return true;
    if (searchBy === "title")
      return post.title.toLowerCase().includes(search.toLowerCase());
    if (searchBy === "admin")
      return post.author && post.author.toLowerCase().includes(search.toLowerCase());
    if (searchBy === "category")
      return post.category && post.category.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar overlays content on the left, fixed */}
      <Sidebar />
      {/* Main content is pushed right by sidebar width */}
      <main className="ml-0 md:ml-60 px-4 md:px-8 py-10 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

  {/* Admin Profile + Settings */}
  <div className="dashboard-grid mb-8">
          {/* Profile */}
          <div className="card bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 shadow-lg p-6 flex flex-col items-center">
            <img
              src={admin.profileImage}
              alt="Admin"
              className="rounded-full border-4 border-blue-300 shadow cursor-pointer"
              style={{ width: "64px", height: "64px", aspectRatio: "1/1" }}
              title="Click to change profile image"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
            <h2 className="text-lg font-semibold mt-2 text-blue-800">{admin.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{admin.email}</p>
            <p className="text-gray-700 text-sm mb-2 italic">{admin.bio}</p>
          </div>

          {/* Settings */}
          <div className="card col-span-2 bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-2 text-purple-800">Admin Settings</h2>
            <form onSubmit={handleAdminSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleAdminChange}
                  className="w-full border rounded px-3 py-2 mb-2"
                  placeholder="Admin Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleAdminChange}
                  className="w-full border rounded px-3 py-2 mb-2"
                  placeholder="Admin Email"
                  required
                />
              </div>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleAdminChange}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Password"
                required
              />
              <textarea
                name="bio"
                value={admin.bio}
                onChange={handleAdminChange}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Bio"
                rows={2}
              />
              <button type="submit" className="btn bg-purple-600 hover:bg-purple-700">
                Update Settings
              </button>
            </form>
          </div>
        </div>

  {/* Add/Edit Post + Posts List */}
  <div className="dashboard-grid mb-8">
          {/* Add/Edit */}
          <div className="card bg-gradient-to-br from-green-100 to-green-50 border border-green-200 shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-green-800">
              {editingPost ? "Edit Post" : "Add New Post"}
            </h2>
            <form
              onSubmit={editingPost ? handleUpdatePost : handleAddPost}
              className="space-y-2"
            >
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handlePostChange}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Title"
                required
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="image"
                  value={newPost.image}
                  onChange={handlePostChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Image URL or browse below"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded px-3 py-2"
                />
              </div>
              <select
                name="category"
                value={newPost.category}
                onChange={handlePostChange}
                className="w-full border rounded px-3 py-2 mb-2"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Politics">Politics</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handlePostChange}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Content"
                rows={4}
                required
              />
              <button type="submit" className="btn bg-green-600 hover:bg-green-700">
                {editingPost ? "Update Post" : "Add Post"}
              </button>
              {editingPost && (
                <button
                  type="button"
                  className="btn bg-gray-400 ml-2"
                  onClick={() => {
                    setEditingPost(null);
                    setNewPost({ title: "", content: "", image: "", category: "" });
                    setImageFile(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Posts Table */}
          <div className="card bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-200 shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
              <h2 className="text-lg font-semibold text-yellow-800">All Posts</h2>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded px-3 py-2"
                  placeholder={`Search by ${searchBy}`}
                />
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="border rounded px-2 py-2"
                >
                  <option value="title">Title</option>
                  <option value="admin">Admin Name</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Admin</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-t">
                    <td className="py-2">{post.title}</td>
                    <td className="py-2">{post.category || "-"}</td>
                    <td className="py-2">{post.author || "-"}</td>
                    <td className="py-2">{post.date}</td>
                    <td className="py-2">
                      <button
                        className="btn mr-2 bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => handleEditPost(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
