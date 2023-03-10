const path = require("path");
const fs = require("fs");
const http = require("http");
const express = require("express");

// $ node index.js diretorio -> essa linha de comando vira o array de baixo
// [node, index.js, diretorio]
// index 2 é o paramtro do diretorio

// process.argv é o usado pra pegar os paramtros do array
const diretorio_paramatro = process.argv[2] || "./";

//juntando o diretorio atual ao passado pelo parametro
const directoryPath = path.join(__dirname, diretorio_paramatro);

const list_files = [];

// lendo o diretorio
fs.readdir(directoryPath, function (err, files) {
  // tratando erros
  if (err) {
    return console.log("Diretório não existe: " + err);
  }
  // listando os diretorios e arquivos do diretorio do parametro
  files.forEach(function (file) {
    // adicionando os arquivos num array pra mostrar na web
    list_files.push(file);
  });
});

const app = express();
app.use(express.json());
app.use(express.static("express"));
// default URL
app.use("/", function (req, res) {
  res.send(
    `
    <div>
    ${(list_files.map((files) => `<h2>${files}</h2>`)).join("")}
    </div>
    `
  );
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug(`servidor Web rodando em http://localhost:${port}`);
