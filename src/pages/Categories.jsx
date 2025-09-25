import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <ul className="list-disc pl-6">
        <li>Technology</li>
        <li>Business</li>
        <li>Science</li>
        <li>Health</li>
        <li>Entertainment</li>
        <li>Sports</li>
      </ul>
      <div className="mt-6">
        <Link to="/categories/browse" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Browse by Category
        </Link>
      </div>
    </div>
  );
};

export default Categories;
