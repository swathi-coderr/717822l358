import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts, fetchPostComments } from "../api/api";  // ✅ Fixed Import

const TrendingPosts = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      const userData = await fetchUsers();
      let postCommentCounts = [];

      for (let userId in userData.users) {
        const posts = await fetchUserPosts(userId);
        for (let post of posts.posts) {
          const comments = await fetchPostComments(post.id);
          postCommentCounts.push({ ...post, commentCount: comments.comments.length });
        }
      }

      postCommentCounts.sort((a, b) => b.commentCount - a.commentCount);
      setTopPosts(postCommentCounts.slice(0, 5));
    };

    getTrendingPosts();
  }, []);

  return (
    <div>
      <h2>Trending Posts</h2>
      <ul>
        {topPosts.map((post) => (
          <li key={post.id}>{post.content} - {post.commentCount} comments</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
