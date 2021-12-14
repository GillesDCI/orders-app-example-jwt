import "./App.css";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ListUsers from "./components/ListUsers";
import Navigation from "./components/Navigation";
import Greeting from "./components/Greeting";

export const AppContext = createContext({
  username: "",
  loggedIn: false,
  handleLogin: () => {},
});

function App() {
  const loginSession = JSON.parse(sessionStorage.getItem("login")) || {
    username: "",
    loggedIn: false,
  };

  const [username, setUsername] = useState(loginSession["username"]);
  const [loggedIn, setLoggedIn] = useState(loginSession["loggedIn"]);

  const handleLogin = (_username) => {
    if (_username) {
      setUsername(_username);
      setLoggedIn(true);
    } else {
      setUsername("");
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem(
      "login",
      JSON.stringify({ username: username, loggedIn: loggedIn })
    );
  }, [username, loggedIn]);

  return (
    <AppContext.Provider value={{ username, loggedIn, handleLogin }}>
      <div className="App">
        <BrowserRouter>
          <Navigation />
          {loggedIn ? <Greeting /> : null}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/list-users" element={<ListUsers />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
