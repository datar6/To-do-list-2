import { Link } from "@tanstack/react-router";
import { AuthContext } from "../context/Context";
import { useContext } from "react";

export function User() {
  const { login, setLogin } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
    setLogin("");
  };

  return (
    <>
      <h1 className="greeting">Welcome to home page</h1>
      <Link to="/app" className="sign-up-link">
        Try to add your first task!
      </Link>
      <p>
        <Link to="/signIn" className="sign-in-link" onClick={handleLogout}>
          Log out
        </Link>
      </p>
    </>
  );
}
