import React, { useState } from "react";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the post to the backend or update state
    alert("Post added! (Admin only feature)");
    setForm({ title: "", content: "", image: "", category: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
