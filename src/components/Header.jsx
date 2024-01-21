import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import styled from "styled-components";

const HeaderContainer = styled.header`
  height: 10vh;
  padding: 0 30px;
  background-color: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoHeader = styled.a`
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
  color: #000;
`

const NavbarLink = styled(Link)`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  color: blak;
  font-size: 20px;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus{
    color: blue;
  };
  &:active{
    color: red;
  };
  @media(max-width: 700px) {
        display: none;
  }
`

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
    <HeaderContainer>
      <LogoHeader href="/">WebFirebase</LogoHeader>
      {user ? (
        <div>
          <span>{user.email}</span>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Saindo..." : "Logout"}
          </button>
        </div>
      ) : (
        <NavbarLink to="/login">Login</NavbarLink>
      )}
    </HeaderContainer>
  );
}

export default Header;
