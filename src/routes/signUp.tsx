import { createFileRoute, useNavigate } from "@tanstack/react-router";
import "../styles/signUp.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type TSignUpSchema } from "@/lib/types";
import {
  setLocalStorageEmail,
  setLocalStoragePassword,
} from "@/functions/local-storage";

export const Route = createFileRoute("/signUp")({
  component: SignUpComponent,
});

function SignUpComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate({ from: "/signUp" });

  const onSubmit = async (data: TSignUpSchema) => {
    setLocalStorageEmail(data);
    setLocalStoragePassword(data);
    reset();
    navigate({ to: "/signIn" });
  };

  return (
    <div className="box">
      <div className="wrapper">
        <h1>Sign Up</h1>
        <div className="corner">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="signUp-form">
          <input {...register("email")} type="email" placeholder="Email" />
          {errors.email && <p className="red">{`${errors.email.message}`}</p>}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="red">{`${errors.password.message}`}</p>
          )}
          <input
            {...register("confirm")}
            type="password"
            placeholder="Confirm password"
          />
          {errors.confirm && (
            <p className="red">{`${errors.confirm.message}`}</p>
          )}
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
