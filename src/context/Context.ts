import { createContext } from "react";

export type Login = {
  login: string;
  setLogin: (login: string) => void;
};

export const AuthContext = createContext<Login>({
  login: "",
  setLogin: () => {},
});
