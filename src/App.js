import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./pages/Post";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
