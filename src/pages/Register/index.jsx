import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import { auth } from "../../services/firebaseConfig";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUp(e) {
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

    // se as infos estiverem ok, carregamento para a home
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Cadastro realizado!");

      // limpar os campos apenas se o cadastro for bem sucedido
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Erro ao criar conta:", error.message);

      // verifica se o erro é de email já cadastrado
      if (error.code === "auth/email-already-in-use") {
        setWarning("Este e-mail já está cadastrado. Tente outro.");

        // não redirecionar se o email já estiver cadastrado
        return;
      } else {
        setWarning("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }

    // se chegou aqui, o cadastro foi bem sucedido e não possui erro de email já cadastrado
    navigate("/");
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
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignUp} disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}{" "}
          <img src={arrowImg} alt="->" />
        </button>

        {warning && <p style={{ color: "red" }}>{warning}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <div>
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Register;
