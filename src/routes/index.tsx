import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthContext } from "../context/Context";
import { useContext } from "react";
import { User } from "../components/User";
import "../styles/index.css";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { login } = useContext(AuthContext);

  return (
    <div className="home-page-box">
      <div className="home-page-wrapper">
        {login ? (
          <User />
        ) : (
          <>
            <h1 className="greeting">Welcome to home page</h1>
            <Link to="/signUp" className="sign-up-link">
              Create an account
            </Link>
            <p>
              Already have an account? Please{" "}
              <Link to="/signIn" className="sign-in-link">
                Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
