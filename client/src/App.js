import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import HomePage from "./components/homepage/HomePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
