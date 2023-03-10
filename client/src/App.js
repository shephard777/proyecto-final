import {BrowserRouter, Routes, Route} from "react-router-dom"
import AccountDashboard from "./components/dashboard/AccountDashboard";
import AddTransaction from "./components/forms/AddTransaction";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
