import { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteFavorito, getFavoritos } from "../servicos/favoritos";
import livroImg from "../imagens/livro.png";

const AppContainer = styled.div`
  width: 100%;
  min-height: 270px;
  background-image: linear-gradient(90deg, #002f52 35%, #326589);
`;
const LivrosFavoritos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LivroFavorito = styled.div`
  background-color: white;
  border-radius: 5px;
  margin: 20px;
  padding: 15px;
  transition: 0.4s all;

  &:hover {
    transform: scale(1.1);
  }
`;
const Titulo = styled.h2`
  color: #fff;
  font-size: 36px;
  text-align: center;
  width: 100%;
  padding-top: 35px;
`;

const LivroFavImg = styled.img`
  width: 120px;
  height: auto;
`;

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  async function fetchFavoritos() {
    const favoritosDaAPI = await getFavoritos();
    console.log(favoritosDaAPI);
    setFavoritos(favoritosDaAPI);
  }

  async function deletarFavorito(id) {
    await deleteFavorito(id);
    await fetchFavoritos();
    alert(`Livro de id: ${id} removido dos favoritos`);
  }

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <AppContainer>
      <Titulo>Aqui estão seus livros favoritos:</Titulo>
      <LivrosFavoritos>
        <div>
          {favoritos.map((favorito) => (
            <LivroFavorito onClick={() => deletarFavorito(favorito.id)}>
              {`${favorito.nome} | ${favorito.id}`}
              <LivroFavImg src={livroImg} alt="livro" />
            </LivroFavorito>
          ))}
        </div>
      </LivrosFavoritos>
    </AppContainer>
  );
}

export default Favoritos;
