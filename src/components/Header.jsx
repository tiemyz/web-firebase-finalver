import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import logoImg from "../assets/logo.svg";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 


  // botão de logout
  const handleLogout = () => {
    setLoading(true);

    // navegação para home após logout
    auth.signOut().then(() => {
      navigate("/");
    }).catch((error) => {
      console.error("Erro ao fazer logout:", error.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <header>
      <h1>WebFirebase</h1>
      {user ? (
        <div>
          <span>{user.email}</span>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Saindo..." : "Logout"}
          </button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}

export default Header;
