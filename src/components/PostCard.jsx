


import React, { useState, useRef } from "react";
import CommentBox from "./CommentBox";

const REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Funny" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" }
];

const PostCard = ({ post }) => {

  const [userReaction, setUserReaction] = useState(null);
  const [reactions, setReactions] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const reactionBtnRef = useRef();

  // Count reactions
  const reactionCounts = REACTIONS.reduce((acc, r) => {
    acc[r.emoji] = reactions[r.emoji]?.length || 0;
    return acc;
  }, {});

  // Simulate user id (for demo, use localStorage or session)
  const userId = "demo-user";

  // Long press logic
  let longPressTimer = useRef();
  const handleReactionBtnDown = () => {
    longPressTimer.current = setTimeout(() => setShowReactionPicker(true), 400);
  };
  const handleReactionBtnUp = () => {
    clearTimeout(longPressTimer.current);
    if (!showReactionPicker) {
      // Tap: toggle like
      handleReact(REACTIONS[0].emoji);
    }
  };
  const handleReactionBtnLeave = () => {
    clearTimeout(longPressTimer.current);
  };

  const handleReact = (emoji) => {
    setReactions((prev) => {
      // Remove previous reaction
      const newReactions = { ...prev };
      REACTIONS.forEach((r) => {
        newReactions[r.emoji] = (newReactions[r.emoji] || []).filter((id) => id !== userId);
      });
      // Add new reaction
      if (userReaction !== emoji) {
        newReactions[emoji] = [...(newReactions[emoji] || []), userId];
        setUserReaction(emoji);
      } else {
        setUserReaction(null);
      }
      return newReactions;
    });
    setShowReactionPicker(false);
  };

  const handleComment = (comment) => setComments([...comments, comment]);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + `#post-${post.id}`);
    setShareCount((c) => c + 1);
    alert("Post link copied to clipboard!");
  };

  if (!post) return null;

  return (
    <div className="card" id={`post-${post.id}`}> {/* Card wrapper */}
      {post.image && (
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.75rem 0.75rem 0 0', background: '#f3f4f6' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-2">
          By <span className="font-semibold">{post.author}</span> | <span>{post.date}</span>
        </p>
        <p className="text-gray-800 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-2 mb-2 relative">
          {/* Main reaction button */}
          <button
            ref={reactionBtnRef}
            className={`btn ${userReaction ? "bg-accent text-white" : ""}`}
            onMouseDown={handleReactionBtnDown}
            onMouseUp={handleReactionBtnUp}
            onMouseLeave={handleReactionBtnLeave}
            onTouchStart={handleReactionBtnDown}
            onTouchEnd={handleReactionBtnUp}
            aria-label="React"
          >
            {userReaction || REACTIONS[0].emoji} {Object.values(reactionCounts).reduce((a, b) => a + b, 0)}
          </button>
          {/* Reaction picker popup */}
          {showReactionPicker && (
            <div className="absolute z-10 flex gap-2 bg-white border rounded shadow p-2 top-10 left-0">
              {REACTIONS.map((r) => (
                <button
                  key={r.emoji}
                  className={`btn ${userReaction === r.emoji ? "bg-accent text-white" : ""}`}
                  onClick={() => handleReact(r.emoji)}
                  aria-label={r.label}
                >
                  {r.emoji} {reactionCounts[r.emoji]}
                </button>
              ))}
            </div>
          )}
          <button className="btn" onClick={handleShare} aria-label="Share">🔗 {shareCount}</button>
          <button className="btn" onClick={() => setShowComments((v) => !v)} aria-label="Comment">💬 {comments.length}</button>
        </div>
        {showComments && (
          <div className="mt-2">
            <CommentBox onSubmit={handleComment} />
            <ul className="mt-2">
              {comments.map((c, i) => (
                <li key={i} className="border-b py-1 text-sm text-gray-700">{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
