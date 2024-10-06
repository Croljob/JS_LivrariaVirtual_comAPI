const {
  getTodosFavoritos,
  deletaFavoritoPorId,
  insereFavorito,
} = require("../servicos/favoritos");

function getFavoritos(req, res) {
  try {
    const favoritos = getTodosFavoritos();
    res.send(favoritos);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function postFavorito(req, res) {
  try {
    const id = req.params.id;
    const livroInserido = insereFavorito(id);
    if (livroInserido) {
      res.status(201);
      res.send("Livro favoritado com sucesso.");
    } else {
      res.status(409);
      res.send("Livro já existe em favoritos");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function deleteFavorito(req, res) {
  try {
    const id = req.params.id;

    if (id && Number(id)) {
      deletaFavoritoPorId(id);
      res.send("Livro deletado com sucesso.");
    } else {
      res.status(422);
      res.send("Id inválido.");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getFavoritos,
  postFavorito,
  deleteFavorito,
};
