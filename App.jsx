import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://20.244.56.144/test/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(Object.entries(response.data.users).map(([id, name]) => ({ id, name })));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchPosts = async (userId) => {
    try {
      setSelectedUser(userId);
      const response = await axios.get("http://20.244.56.144/test/users/1/posts");
      setPosts(response.data.posts);
      setComments([]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const fetchComments = async (postId) => {
    try {
      setSelectedPost(postId);
      const response = await axios.get("http://20.244.56.144/test/posts/150/comments");
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Please enter both name and email!");
      return;
    }
    const newEntry = { id: users.length + 1, name: newUser.name };
    setUsers([...users, newEntry]);
    setNewUser({ name: "", email: "" });
    alert("User added successfully");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Social Media Analytics</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => fetchPosts(user.id)} style={{ cursor: "pointer", color: "blue" }}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h3>Posts by User {selectedUser}</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id} onClick={() => fetchComments(post.id)} style={{ cursor: "pointer", color: "green" }}>
                {post.content}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedPost && (
        <div>
          <h3>Comments on Post {selectedPost}</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
