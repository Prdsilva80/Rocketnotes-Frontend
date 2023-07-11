import { useState } from "react";
import { Container, Form } from "./styles";

import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Section } from "../../components/Section";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]); // array empty
  const [newLink, setNewLink] = useState(""); // String Empty

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();
  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]); // Create new array, using the REST(...) for load and Add one link in the Array
    setNewLink(""); //Reset the State
  }

  function handleBack(){
    navigate(-1)
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewNote() {
    if(!title){
        return alert("Digite o título da nota")
    }


    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar, mas não clicou em adiconar"
      );
    }

    if (newLink) {
      return alert(
        "Você deixou uma Link no campo para adicionar, mas não clicou em adiconar"
      );
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });

    alert("Nota adicionada");
    navigate(-1);
  }
  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
      
            <ButtonText title="voltar" onClick={handleBack}/>
          </header>

          <Input
            placeholder="Titulo"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Escreva um novo texto"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              //Create New link disable for show the links created
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
              isNew
              value={newLink}
              placeholder="Novo link"
              onClick={handleAddLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                />
              ))}
              <NoteItem
                isNew
                value={newTag}
                placeholder="Nova Tag"
                onClick={handleAddTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
