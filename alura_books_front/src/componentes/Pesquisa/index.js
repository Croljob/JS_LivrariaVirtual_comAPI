import Input from "../Input/Index";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getLivros } from "../../servicos/livros";
import livroImg from "../../imagens/livro.png";
import { postFavorito } from "../../servicos/favoritos";

const PesquisaContainer = styled.section`
  background-image: linear-gradient(90deg, #002f52 39%, #326589 168%);
  color: #fff;
  text-align: center;
  padding: 85px 0;
  min-height: 270px;
  width: 100%;
`;

const Titulo = styled.h2`
  color: #fff;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const Subtitulo = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
`;
const Resultados = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Resultado = styled.div`
  margin: 20px;
  transition: 0.4s all;

  &:hover {
    transform: scale(1.1);
  }
`;
const LivroImg = styled.img`
  width: 120px;
  height: auto;
`;

function Pesquisa() {
  const [livrosPesquisados, setLivrosPesquisados] = useState([]);
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetchLivros();
  }, []);

  async function fetchLivros() {
    const livrosDaAPI = await getLivros();
    setLivros(livrosDaAPI);
  }

  async function insertFavorito(id) {
    try {
      await postFavorito(id);
      alert(`[ :) ] Livro id: ${id} marcado como favorito`);
    } catch (error) {
      alert(`[ :o ] Livro já favoritado`);
    }
  }

  return (
    <PesquisaContainer>
      <Titulo>Já sabe por onde começar?</Titulo>
      <Subtitulo>Encontre seus livros na nossa estante.</Subtitulo>
      <Input
        placeholder="Pesquisar..."
        onBlur={(evento) => {
          const textoDigitado = evento.target.value;
          const resultadoPesquisa = livros.filter((livro) =>
            livro.nome.includes(textoDigitado)
          );
          setLivrosPesquisados(resultadoPesquisa);
        }}
      />
      <Resultados>
        {livrosPesquisados.map((livro) => (
          <Resultado onClick={() => insertFavorito(livro.id)}>
            <p>{`${livro.nome} | ${livro.id}`}</p>
            <LivroImg src={livroImg} alt="Capa" />
          </Resultado>
        ))}
      </Resultados>
    </PesquisaContainer>
  );
}

export default Pesquisa;
