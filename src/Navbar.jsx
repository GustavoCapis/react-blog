import { Link } from "react-router-dom";

export default function Navbar({searchPost, setSearchPost}) {
  return (
    <nav className="navbar">
      <input type="text" 
      name="search"
      placeholder="Search Posts"
      value={searchPost}
      onChange={(e)=> {setSearchPost(e.target.value)}} />
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li>About</li>
      </ul>
    </nav>
  );
}
