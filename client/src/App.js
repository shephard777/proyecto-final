import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import AddTransaction from "./components/Forms/AddTransaction";
import AccountDashboard from "./components/Dashbaord/AccountDashboard";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/dashboard" element={<AccountDashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
