
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { posts as initialPosts } from "../data";
import Header from "../components/Header";


const Home = () => {
    const location = useLocation();
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");
        return saved ? JSON.parse(saved) : initialPosts;
    });

    useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem("posts");
            if (saved) setPosts(JSON.parse(saved));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    const filteredPosts = q
        ? posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(q.toLowerCase()) ||
                    (post.content && post.content.toLowerCase().includes(q.toLowerCase())) ||
                    (post.category && post.category.toLowerCase().includes(q.toLowerCase()))
            )
        : posts;

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
