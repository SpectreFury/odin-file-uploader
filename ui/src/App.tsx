import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { ENDPOINTS } from "./utils/api";
import {Toaster} from 'sonner'

function App() {
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(ENDPOINTS.auth.me, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error: not authenticated");
      }

      const result = await response.json();
      console.log(result);
    };

    getUser();
  }, []);

  return (
    <main>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
