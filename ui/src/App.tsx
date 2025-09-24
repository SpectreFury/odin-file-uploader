import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<h1>Hello World</h1>} />
      </Routes>
    </main>
  );
}

export default App;
