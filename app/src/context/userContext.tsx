import { ReactNode, createContext, useState } from "react";

interface UserContextValue {
  name: string;
  lastname: string;
  email: string;
  username:string;
  token: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  setLastname: (name: string) => void;
  setToken: (token: string) => void;
  cleanUserInfo:()=>void
}

interface UserContextProviderProps {
  children: ReactNode;
}

const userContextDefaultValue: UserContextValue = {
  email: "",
  username:"",
  name: "",
  lastname: "",
  token: "",
  setEmail: () => {},
  setUsername: () => {},
  setName: () => {},
  setLastname: () => {},
  setToken: () => {},
  cleanUserInfo:()=>{}
};

export const UserContext = createContext<UserContextValue>(
  userContextDefaultValue
);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const cleanUserInfo=()=>{
    setUsername("")
    setEmail("")
    setName("")
    setLastname("")
    setToken("")
  }

  const value: UserContextValue = {
    username,
    email,
    name,
    lastname,
    token,
    setEmail,
    setName,
    setLastname,
    setToken,
    setUsername,
    cleanUserInfo
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
