import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import arrowImg from "../../assets/arrow.svg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const authInstance = getAuth();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(authInstance);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        // redirecionar apenas se o usuário estiver autenticado e não houver avisos
        if (!warning) {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [authInstance, navigate, warning]);

  async function handleSignIn(e) {
    e.preventDefault();
  
    if (!email || !password) {
      setWarning("Preencha todos os campos obrigatórios!");
      return;
    }
  
    if (!email.includes("@")) {
      setWarning("Digite um email válido.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(email, password);
      // limpar os campos se o login for bem sucedido
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
  
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        // se o usuário ou senha estiverem incorretos, exibir um aviso na tela
        setWarning("Credenciais inválidas. Verifique seu email e senha.");
      } else if (error.code === "auth/invalid-email") {
        setWarning("Email incorreto. Por favor, verifique o email digitado.");
      } else {
        // qualquer outro erro na aplicação
        setWarning("Erro ao fazer login. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />

      <form>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="user@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
          />
        </div>

        <a href="#">Esqueceu sua senha ?</a>

        <button onClick={handleSignIn} disabled={loading}>
          {loading ? "Carregando..." : "Entrar"} <img src={arrowImg} alt="->" />
        </button>

        {warning && <p style={{ color: "red" }}>{warning}</p>}

        <div>
          <p>Você não tem uma conta?</p>
          <Link to="/register">Crie a sua conta aqui</Link>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Login;
