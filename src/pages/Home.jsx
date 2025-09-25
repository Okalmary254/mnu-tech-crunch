import PostCard from "../components/PostCard";
import {posts} from "../data";
import Header from "../components/Header";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
