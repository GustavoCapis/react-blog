import Header from "./Header";
import Footer from "./Footer";
import api from "./api/posts";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);

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
          //No response or 404 error
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
      <section></section>
      <Footer />
    </>
  );
}

export default App;
