import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="Toggle theme"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
