import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import arrowImg from "../../assets/arrow.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const authInstance = getAuth(); // obter a instância de autenticação do firebase
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(authInstance);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        // se o usuário estiver autenticado, redirecione para a página desejada
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [authInstance, navigate]);

  async function handleSignIn(e) {
    e.preventDefault();

    // caso algum campo não tenha sido preenchido
    if (!email || !password) {
      setWarning("Preencha todos os campos obrigatórios!");
      return;
    }

    // caso o usuário esqueça de colocar o @
    if (!email.includes("@")) {
      setWarning("Digite um email válido.");
      return;
    }

    try {
      // realizar o login
      await signInWithEmailAndPassword(email, password);
      return;
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);

      // verificar o tipo de erro
      if (error.code === "auth/wrong-password") {
        setWarning("Senha incorreta. Por favor, tente novamente.");
      } else if (error.code === "auth/user-not-found") {
        setWarning(
          "Este email não está cadastrado. Por favor, faça o seu cadastro ou verifique o email digitado."
        );
      } else if (error.code === "auth/invalid-email") {
        setWarning("Email incorreto. Por favor, verifique o email digitado.");
      } else {
        setWarning("Credenciais inválidas. Verifique seu email e senha.");
      }
    } finally {
      setLoading(false);

      // limpar os campos se o login não for bem sucedido
      if (!warning) {
        setEmail("");
        setPassword("");
      }
    }
  }

  return (
    <div>

      <form>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="user@email.com"
            onChange={(e) => setEmail(e.target.value)}
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

    </div>
  );
}

export default Login;