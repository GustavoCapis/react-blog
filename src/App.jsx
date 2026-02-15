import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import Header from "./Header";
import Home from "./Home";
import Post from "./Post";
import Footer from "./Footer";

function App() {
  //Redirect to home after submit
  const navigate = useNavigate();
  //States
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

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
      setPosts((prev) => [...prev, response.data]);
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
      setPosts((prev) => prev.filter((post)=> post.id !== id));
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home
          handleDelete={handleDelete}
          posts={posts} />} />
          <Route
            path="/post"
            element={
              <Post
                postTitle={postTitle}
                postBody={postBody}
                setPostTitle={setPostTitle}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
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
