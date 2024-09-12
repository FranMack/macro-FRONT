import { useEffect,useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { UserHome } from "./views/UserHome";
import { Preferences } from "./views/Preferences";
import { Privacy } from "./views/Privacy";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { UserContext } from "./context/userContext";
import axios from "axios";
import { PrivateRouter,PublicRouter } from "./router";
import { Navigate } from "react-router-dom";

function App() {
  const { setEmail, setLastname, setName, setToken,setUsername,email } = useContext(UserContext);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    let userData = null;
    let token = null;

    if (userDataString) {
      userData = JSON.parse(userDataString);
      token = userData.token;
    }

    if (token) {
      axios
        .get("http://localhost:3000/api/auth/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setToken(token);
          setEmail(userData.email);
          setName(userData.name);
          setUsername(userData.username)
          setLastname(userData.lastname);
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
        <Route path="login" element={<PublicRouter><Login /></PublicRouter>} />
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
