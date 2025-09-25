import React, { useState } from "react";
import { posts as initialPosts } from "../data";


const AdminDashboard = () => {
  const [admin, setAdmin] = useState({
    email: "admin@site.com",
    password: "admin123",
    name: "Admin User"
  });
  const [profile, setProfile] = useState({
    name: "Admin User",
    bio: "Site administrator."
  });
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: "", category: "" });
  const [imageFile, setImageFile] = useState(null);

  // Admin credential change
  const handleAdminChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    alert("Admin credentials updated (mock only)");
  };

  // Profile change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (mock only)");
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
      excerpt: newPost.content.slice(0, 60) + "..."
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
    const updated = posts.map((p) => (p.id === editingPost.id ? { ...editingPost, ...newPost } : p));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Change Admin Credentials</h2>
          <form onSubmit={handleAdminSubmit} className="space-y-2">
            <input type="email" name="email" value={admin.email} onChange={handleAdminChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Admin Email" required />
            <input type="password" name="password" value={admin.password} onChange={handleAdminChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Password" required />
            <button type="submit" className="btn">Update Credentials</button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Profile Settings</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-2">
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Name" required />
            <textarea name="bio" value={profile.bio} onChange={handleProfileChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Bio" rows={2} />
            <button type="submit" className="btn">Update Profile</button>
          </form>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingPost ? "Edit Post" : "Add New Post"}</h2>
        <form onSubmit={editingPost ? handleUpdatePost : handleAddPost} className="space-y-2">
          <input type="text" name="title" value={newPost.title} onChange={handlePostChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Title" required />
          <div className="flex gap-2 mb-2">
            <input type="text" name="image" value={newPost.image} onChange={handlePostChange} className="w-full border rounded px-3 py-2" placeholder="Image URL or browse below" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded px-3 py-2" />
          </div>
          <input type="text" name="category" value={newPost.category} onChange={handlePostChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Category" />
          <textarea name="content" value={newPost.content} onChange={handlePostChange} className="w-full border rounded px-3 py-2 mb-2" placeholder="Content" rows={4} required />
          <button type="submit" className="btn">{editingPost ? "Update Post" : "Add Post"}</button>
          {editingPost && <button type="button" className="btn bg-gray-400 ml-2" onClick={() => { setEditingPost(null); setNewPost({ title: "", content: "", image: "", category: "" }); setImageFile(null); }}>Cancel</button>}
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">All Posts</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="py-2">{post.title}</td>
                <td className="py-2">{post.category || "-"}</td>
                <td className="py-2">{post.date}</td>
                <td className="py-2">
                  <button className="btn mr-2" onClick={() => handleEditPost(post)}>Edit</button>
                  <button className="btn bg-red-500 hover:bg-red-600" onClick={() => handleDeletePost(post.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
