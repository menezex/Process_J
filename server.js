const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { format } = require("date-fns");

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
    if (erro) throw erro;

    res.redirect("/");
  });
});

//Cadastro Processos
app.post("/cadastrarProcesso", (req, res) => {
  const processo = {
    nome: req.body.nomeCliente,
    cpf: req.body.cpf,
    processo: req.body.numProcesso,
    parte: req.body.partContrariaProcesso,
    dataProcesso: req.body.dataProcesso,
    prazo: req.body.prazo,
    causa: req.body.causaProcesso,
    dataPrazo: req.body.dataPrazoProcesso,
  };

  if (processo.prazo === "nao") {
    let sql = `INSERT INTO processos
    (NOME, CPF, PROCESSO, PARTE, DATA_PROCESSO, PRAZO, CAUSA) 
    values
    ('${processo.nome}', '${processo.cpf}', '${processo.processo}','${processo.parte}', '${processo.dataProcesso}', '${processo.prazo}', '${processo.causa}')`;

    connection.query(sql, (erro, retorno) => {
      if (erro) throw erro;

      res.redirect("/");
    });
  } else {
    let sql = `INSERT INTO processos
    (NOME, CPF, PROCESSO, PARTE, DATA_PROCESSO, PRAZO, CAUSA, DATA_PRAZO) 
    values
    ('${processo.nome}', '${processo.cpf}', '${processo.processo}','${processo.parte}', '${processo.dataProcesso}', '${processo.prazo}', '${processo.causa}','${processo.dataPrazo}')`;

    connection.query(sql, (erro, retorno) => {
      if (erro) throw erro;

      res.redirect("/");
    });
  }
});

//Delete
app.get("/deletar/:cpf", function (req, res) {
  let sqlCliente = `DELETE FROM cliente where CPF = ${req.params.cpf}`;
  let sqlProcesso = `DELETE FROM processos where CPF = ${req.params.cpf}`;

  connection.query(sqlCliente, function (erro, retorno) {
    if (erro) throw erro;

    connection.query(sqlProcesso, function (erro, retorno) {
      if (erro) throw erro;
    });
  });
  res.redirect("/");
});

//Buscar CPF
app.get("/buscar/:cpf", function (req, res) {
  let sql = `SELECT * FROM cliente where CPF = ${req.params.cpf}`;

  connection.query(sql, function (erro, retorno) {
    if (erro) throw erro;

    res.send(retorno);
  });
});

//Buscar PROCESSO
app.get("/buscarProcesso/:processo", function (req, res) {
  let sql = `SELECT * FROM processos where PROCESSO = ${req.params.processo}`;
  connection.query(sql, function (erro, retorno) {
    if (erro) throw erro;

    res.send(retorno);
  });
});

//Rota de tela de processos
app.get("/processos", (req, res) => {
  connection.query("SELECT nome, cpf FROM cliente", (err, results) => {
    if (err) {
      console.error("Erro ao consultar o MySQL:", err);
      res.status(500).send("Erro interno do servidor");
    } else {
      res.render("processos.ejs", { data: results });
    }
  });
});

//Rota de tela do processo do cliente
app.get("/exibirProcesso/:cpf", function (req, res) {
  let sqlCliente = `SELECT * FROM cliente WHERE CPF = '${req.params.cpf}'`;
  let sqlProcesso = `SELECT * FROM processos WHERE CPF = '${req.params.cpf}'`;

  let dataCliente;
  let dataProcesso;

  connection.query(sqlCliente, function (erro, retorno) {
    if (erro) throw erro;
    dataCliente = retorno;

    connection.query(sqlProcesso, function (erro, retorno) {
      if (erro) {
        alert("Cliente não possui processos cadastrados");
        res.redirect("/");
      }
      dataProcesso = retorno;

      //Formatar datas
      const timeZone = "America/Sao_Paulo";
      dataProcesso.forEach((processo) => {
        const brasiliaDate = new Date(processo.DATA_PROCESSO);
        const brasiliaDate2 = new Date(processo.DATA_PRAZO);
        processo.DATA_PROCESSO_FORMATADA = format(brasiliaDate, "dd/MM/yyyy", {
          timeZone,
        });
        processo.DATA_PRAZO_FORMATADA = format(brasiliaDate2, "dd/MM/yyyy", {
          timeZone,
        });
      });

      res.render("viewProcessos.ejs", {
        cliente: dataCliente,
        processo: dataProcesso,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
