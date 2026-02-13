import reactLogo from "./assets/react.svg";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <header className="header">
        <img className="header-icon" src={reactLogo} alt="react-logo" />
        <h1 className="header-title">React.js Blog</h1>
      </header>
      <Navbar />
    </>
  );
}
