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

  //Fetch request
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

  //On form submit
  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      date,
      body: postBody,
    };
    setPosts((prev) => [...prev, newPost]);
    //Clear form after submit
    setPostTitle("");
    setPostBody("");
    //Redirect to home after submit
    navigate("/");
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
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
      <Footer />
    </>
  );
}

export default App;
