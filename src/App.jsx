import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import api from "./api/posts";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);

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
  console.log(posts);
  return (
    <>
      <Header />
      <Home posts={posts} />
      <Footer />
    </>
  );
}

export default App;
