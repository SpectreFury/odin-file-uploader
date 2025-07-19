import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Register";
import Home from "./pages/Home";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;
