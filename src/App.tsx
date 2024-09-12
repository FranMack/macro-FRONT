import axios from "axios";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { envs } from "./config/envs";
import { UserContext } from "./context/userContext";
import { PrivateRouter, PublicRouter } from "./router";
import { Login } from "./views/Login";
import { Privacy } from "./views/Privacy";
import { UserHome } from "./views/UserHome";

interface User {
  email: string;
  name: string;
  lastname: string;
  username: string;
  token: string;
}

function App() {
  const { setEmail, setLastname, setName, setToken, setUsername, email } =
    useContext(UserContext);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    let userData: User = {
      email: "",
      name: "",
      lastname: "",
      username: "",
      token: "",
    };
    let token = "";

    if (userDataString) {
      userData = JSON.parse(userDataString);
      token = userData.token;
    }

    if (token) {
      axios
        .get(`${envs.API_DOMAIN}/api/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setToken(token);
          setEmail(userData!.email);
          setName(userData!.name);
          setUsername(userData!.username);
          setLastname(userData!.lastname);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <>
      {email && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <UserHome />
            </PrivateRouter>
          }
        />
        <Route
          path="login"
          element={
            <PublicRouter>
              <Login />
            </PublicRouter>
          }
        />
        <Route
          path="bancainternet"
          element={
            <PrivateRouter>
              <UserHome />
            </PrivateRouter>
          }
        />

        <Route
          path="privacy"
          element={
            <PrivateRouter>
              <Privacy />
            </PrivateRouter>
          }
        />
      </Routes>
      {/*email && <Footer />*/}
    </>
  );
}

export default App;
