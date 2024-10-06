const fs = require("fs");

function getTodosFavoritos() {
  return JSON.parse(fs.readFileSync("favoritos.json"));
}

function deletaFavoritoPorId(id) {
  const livros = JSON.parse(fs.readFileSync("favoritos.json"));
  const livrosFiltrados = livros.filter((livro) => livro.id !== id);
  fs.writeFileSync("favoritos.json", JSON.stringify(livrosFiltrados));
}

// function deletaFavoritoPorId(id) {
//   const userConfirmation = confirm(
//     "Você tem certeza de que deseja deletar este item?");
//   if (userConfirmation) {
//     const livros = JSON.parse(fs.readFileSync("favoritos.json"));
//     const livrosFiltrados = livros.filter((livro) => livro.id !== id);
//     fs.writeFileSync("favoritos.json", JSON.stringify(livrosFiltrados));
//     console.log(`Item com id ${id} foi deletado.`);
//   } else {
//     console.log("Operação de exclusão cancelada.");
//   }
// }

function insereFavorito(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const favoritos = JSON.parse(fs.readFileSync("favoritos.json"));
  let TestaFavoritos = favoritos.find((favorito) => favorito.id === id);
  if (TestaFavoritos === undefined) {
    const livroInserido = livros.find((livro) => livro.id === id);
    const novaListaDeFavoritos = [...favoritos, livroInserido];
    fs.writeFileSync("favoritos.json", JSON.stringify(novaListaDeFavoritos));
    return true;
  }
}

module.exports = {
  getTodosFavoritos,
  deletaFavoritoPorId,
  insereFavorito,
};
