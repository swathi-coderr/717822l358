import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts } from "../api/api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const userData = await fetchUsers();
      let userPostCounts = [];

      for (let userId in userData.users) {
        const posts = await fetchUserPosts(userId);
        userPostCounts.push({ id: userId, name: userData.users[userId], postCount: posts.posts.length });
      }

      userPostCounts.sort((a, b) => b.postCount - a.postCount);
      setUsers(userPostCounts.slice(0, 5));
    };

    getTopUsers();
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.postCount} posts</li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
