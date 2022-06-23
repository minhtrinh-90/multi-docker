import { Link, Route, Routes } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Fib App</p>
        <Link to="/">Home Page</Link>
        <Link to="/other-page">Other Page</Link>
      </header>

      <Routes>
        <Route index path="/" element={<Fib />} />
        <Route path="/other-page" element={<OtherPage />} />
      </Routes>
    </div>
  );
}

export default App;
