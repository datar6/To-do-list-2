import {
  createFileRoute,
  Link,
  Navigate,
  useNavigate,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import "../styles/signIn.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type TSignInSchema } from "@/lib/types";
import { useContext } from "react";
import { AuthContext } from "../context/Context";

export const Route = createFileRoute("/signIn")({
  component: SignInComponent,
});

function SignInComponent() {
  const { login, setLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  if (login) {
    return <Navigate to="/app" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: TSignInSchema) => {
    setLogin(data.email);
    navigate({ to: "/app" });
  };

  return (
    <div className="sign-in-box">
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email..."
          ></input>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password..."
          ></input>{" "}
          {errors.password && (
            <p className="red">{`${errors.password.message}`}</p>
          )}
          <button type="submit">Submit</button>
        </form>
        <p>
          Don't have an account yet?{" "}
          <Link to="/signUp" className="sign-up-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
