import './App.css';
import InputShortner from './InputShortner';
import LinkResult from './LinkResult';
import History from './History';
import Login from './Login';
import Signup from './Signup';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    } else if (!loggedIn && window.location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="container">

      <nav>
        {loggedIn && (
          <>
            <Link to="/">Home</Link> |{" "}
            <Link to="/history">History</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>

        <Route
          path="/"
          element={
            loggedIn ? (
              <>
                <InputShortner setInputValue={setInputValue} />
                <div>
                  <LinkResult inputValue={inputValue} />
                </div>
              </>
            ) : <Login setLoggedIn={setLoggedIn} />
          }
        />

        <Route
          path="/history"
          element={loggedIn ? <History /> : <Login setLoggedIn={setLoggedIn} />}
        />

        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
