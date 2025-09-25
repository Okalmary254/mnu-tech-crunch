import React from "react";

const categories = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Entertainment",
  "Sports",
  "Politics",
  "Other"
];

const CategoryMenu = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 rounded-full border ${selected === cat ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => onSelect && onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
