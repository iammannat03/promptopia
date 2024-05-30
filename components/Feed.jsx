"use client";
import { useEffect, useState } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filtered = posts.filter((post) => post.tag === tag);
    setFilteredPosts(filtered);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);

    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        return (
          post.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.creator.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          post.prompt.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredPosts(filtered);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", { next: { revalidate: 10 } });
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
