import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CardDetail from "./components/CardDetail";
import FormActivityCreate from "./components/FormActivityCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:ID" element={<CardDetail />} />
        <Route path="/create" element={<FormActivityCreate />} />
      </Routes>
    </div>
  );
}

export default App;
