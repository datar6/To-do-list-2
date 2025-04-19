import {
  createRootRoute,
  Navigate,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { AuthContext } from "../context/Context";
import { useState, useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [login, setLogin] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const savedEmail = localStorage.getItem("Email");
    const savedPassword = localStorage.getItem("Password");
    if (savedEmail && savedPassword) {
      setLogin(savedEmail);
    } else {
      setLogin("");
    }
  }, []);

  const publicRoutes = ["/", "/signIn", "/signUp"];

  if (!login && !publicRoutes.includes(location.pathname)) {
    return <Navigate to="/signIn" />;
  }

  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
