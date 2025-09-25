import React from "react";
import { useParams } from "react-router-dom";
import { posts } from "../data";
import PostCard from "../components/PostCard";

const BlogDetail = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  return (
    <div className="container mx-auto px-4 py-8">
      {post ? (
        <PostCard post={post} />
      ) : (
        <div className="text-red-500">Post not found.</div>
      )}
    </div>
  );
};

export default BlogDetail;
