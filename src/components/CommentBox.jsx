import React, { useState } from "react";

const CommentBox = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit && onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentBox;
