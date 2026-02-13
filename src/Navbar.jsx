import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <input type="text" 
      name="search"
      placeholder="Search Posts" />
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li>About</li>
      </ul>
    </nav>
  );
}
