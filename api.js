const API_BASE_URL = "http://20.244.56.144/test";

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const fetchUserPosts = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
  return response.json();
};

export const fetchPostComments = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.json();
};
