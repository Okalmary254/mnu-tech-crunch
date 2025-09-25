
import React, { useEffect, useState } from "react";

const PostCard = ({ post: initialPost, postId }) => {
	const [post, setPost] = useState(initialPost || null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!post && postId) {
			setLoading(true);
			// Simulate fetching from backend
			fetch(`/api/posts/${postId}`)
				.then((res) => {
					if (!res.ok) throw new Error("Failed to fetch post");
					return res.json();
				})
				.then((data) => {
					setPost(data);
					setLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setLoading(false);
				});
		}
	}, [post, postId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">{error}</div>;
	if (!post) return null;

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
			<img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
			<div className="p-4">
				<h2 className="text-xl font-bold mb-2">{post.title}</h2>
				<p className="text-gray-600 text-sm mb-2">
					By {post.author} | {post.date}
				</p>
				<p className="text-gray-800 mb-4">{post.excerpt}</p>
				<a href={`/post/${post.id}`} className="text-blue-500 hover:underline font-semibold">
					Read More
				</a>
			</div>
		</div>
	);
};

export default PostCard;
