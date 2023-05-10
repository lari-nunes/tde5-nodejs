const express = require("express");
const app = express();
const porta = 3000;

app.use(express.json());

const toDo = [
  {
    id: 1,
    name: "Comprar leite",
    description: "Ir no mercado da esquina e comprar leite",
    isDone: false,
  },
];

// exibir a lista de cadastro
app.get("/tasks", (req, res) => {
  res.json({
    toDo,
  });
});

// criar uma nova lista
app.post("/tasks", (req, res) => {
  const testar = {
    id: toDo.length + 1,
    name: req.body.name,
    description: req.body.description,
    isDone: req.body.isDone,
  };
  toDo.push(testar);
  res.status(201).json({
    testar,
  });
});

// atualizar uma tarefa existente
app.put("/tasks/:id", (req, res) => {
  const pegarID = Number(req.params.id);
  const update = toDo.find((task) => {
    return task.id === pegarID;
  });
  update.name = req.body.name;
  update.description = req.body.description;
  update.isDone = req.body.isDone;
  res.status(200);
});

// deletar tarefa
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  toDo = toDo.filter((task) => {
    return task.id !== id;
  });
  res.status(200).send();
});

app.listen(porta, () => {
  console.log("Ele está funcionando!");
});
