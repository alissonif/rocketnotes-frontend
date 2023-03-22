// import { Fragment } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/section";
import { Tag } from "../../components/Tag";
import { ButtonText } from "../../components/ButtonText";
import { useState, useEffect } from "react";

// import { api } from "C:/Users/Alisson/Documents/1Projetos/Stage09.2/rocketnotes/backend/src/services/api";
import { api } from "../../../backend/src/services/api";

export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    // navigate("/");
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?");
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      // navigate("/");
    navigate(-1);

    }
  }
  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);
  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}
            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
