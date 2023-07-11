import { useState } from "react";
import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { FiLogIn, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

export function SignUp() {
  const [name, setNome] = useState(""); // hook  que cria um estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos");
    }
    console.log(name, email, password);
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuario Cadastrado com sucesso");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possivel cadastrar");
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p> Aplicação para salvar e gerenciar seus linkes ùteis</p>
        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          title="Cadastrar"
          icon={FiLogIn}
          onClick={handleSignUp}
        ></Button>

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
