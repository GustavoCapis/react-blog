export default function Navbar() {
  return (
    <nav className="navbar">
      <input type="text" 
      name="search"
      placeholder="Search Posts" />
      <ul>
          <li>Home</li>
          <li>Post</li>
          <li>About</li>
      </ul>
    </nav>
  );
}
