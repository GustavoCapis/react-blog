import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import EditPost from "./Pages/EditPost";
import Footer from "./Components/Footer";

function App() {
  //Redirect to home after submit
  const navigate = useNavigate();
  //States
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searchPost, setSearchPost] = useState("");

  //Derived state
  //Render based on search value
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
      post.body.toLowerCase().includes(searchPost.toLowerCase()),
  );

  //Fetch request (GET request)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          //Not in the 200 response range
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          //No response
          console.log(`Error: ${error.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  //On form submit (POST request)
  async function handleSubmit(e) {
    e.preventDefault();
    //validate post
    if (!postTitle.trim() || !postBody.trim()) return;
    //create data
    const id = crypto.randomUUID();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    try {
      const response = await api.post("/posts", newPost);
      setPosts((prev) => [response.data, ...prev]);
      //Clear form after submit
      setPostTitle("");
      setPostBody("");
      //Redirect to home after submit
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  //Delete post (DELETE request)
  async function handleDelete(id) {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  //Edit post (UPDATE request)
  async function handleEdit(id) {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...response.data } : post)),
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <Header searchPost={searchPost} onSearchChange={setSearchPost} />
      <main className="page-content">
        <Routes>
          <Route
            path="/"
            element={<Home onDelete={handleDelete} posts={filteredPosts} />}
          />
          <Route
            path="/post"
            element={
              <Post
                postTitle={postTitle}
                postBody={postBody}
                onTitleChange={setPostTitle}
                onBodyChange={setPostBody}
                onSubmit={handleSubmit}
              />
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <EditPost
                posts={posts}
                editTitle={editTitle}
                editBody={editBody}
                onEditTitle={setEditTitle}
                onEditBody={setEditBody}
                onSubmitEdit={handleEdit}
              />
            }
          ></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
