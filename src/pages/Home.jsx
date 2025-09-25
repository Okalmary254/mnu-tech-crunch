

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import Header from "../components/Header";

const Home = () => {
    const location = useLocation();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/posts/")
            .then((res) => res.json())
            .then((data) => setPosts(data));
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
