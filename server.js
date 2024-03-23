const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "process_j",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conexão ao MySQL bem-sucedida");
  }
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/images", express.static("./images"));
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.use(bodyParser.urlencoded({ extended: true }));

//Rotas
//Pegar os dados
app.get("/", (req, res) => {
  connection.query("SELECT * FROM cliente", (err, results) => {
    if (err) {
      console.error("Erro ao consultar o MySQL:", err);
      res.status(500).send("Erro interno do servidor");
    } else {

      res.render("index", { data: results });
    }
  });
});

//Enviar os dados
app.post("/cadastrar", (req, res) => {
  const data = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    cep: req.body.cep,
    bai: req.body.bai,
    rua: req.body.rua,
    num: req.body.num,
    tel: req.body.tel,
  };
  let sql = `INSERT INTO cliente 
  (NOME, CPF , CEP , RUA , BAIRRO, END_NUMERO , TELEFONE) values ('${data.nome}', '${data.cpf}', '${data.cep}', '${data.rua}', '${data.bai}', '${data.num}', '${data.tel}')`;
  connection.query(sql, (erro, retorno) => {
    if(erro) throw erro

    res.redirect("/");
  });
  

});

//Delete
app.get("/deletar/:cpf", function (req, res) {
  let sql = `DELETE FROM cliente where CPF = ${req.params.cpf}`;

  connection.query(sql, function (erro, retorno) {
    if (erro) throw erro;

    res.redirect("/");
  });
});

//Buscar CPF
app.get('/buscar/:cpf', function(req, res) {
  let sql = `SELECT * FROM cliente where CPF = ${req.params.cpf}`;

  connection.query(sql, function(erro, retorno){
    if(erro) throw erro

    res.send(retorno)
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
