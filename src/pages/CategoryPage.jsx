import React, { useState } from "react";
import PostCard from "../components/PostCard";
import { posts as initialPosts } from "../data";
import CategoryMenu from "../components/CategoryMenu";

const CategoryPage = () => {
  const [selected, setSelected] = useState(null);
  const [posts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const filtered = selected ? posts.filter(p => p.category === selected) : posts;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>
      <CategoryMenu selected={selected} onSelect={setSelected} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length ? filtered.map(post => (
          <PostCard key={post.id} post={post} />
        )) : <div className="col-span-full text-gray-500">No posts in this category.</div>}
      </div>
    </div>
  );
};

export default CategoryPage;
