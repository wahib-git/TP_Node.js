const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Sample data
const tables = [
  { id: 1, name: "samia" },
  { id: 2, name: "Samira" },
];

// Root URL route
app.get("/", (req, res) => {
  res.send('<a href="/tables">View Tables</a>');
});

// API to return a list of tables
app.get("/tables", (req, res) => {
  res.json(tables);
});

// API to create a table
app.post("/tables/create", (req, res) => {
  const table = req.body;
  tables.push(table);
  res.send(table);
});

// API to update a table
app.put("/tables/:tableId", (req, res) => {
  const tableId = parseInt(req.params.tableId);
  const table = tables.find((t) => t.id === tableId);
  if (!table) {
    return res.status(404).send("Table not found");
  }

  const updatedTable = req.body;
  table.name = updatedTable.name || table.name;
  table.columns = updatedTable.columns || table.columns;

  res.send(table);
});

// API to return the index of a column in a table
app.get("/tables/:tableId/columns/:columnName", (req, res) => {
  const tableId = parseInt(req.params.tableId);
  const columnName = req.params.columnName;

  const table = tables.find((t) => t.id === tableId);
  if (!table) {
    return res.status(404).send("Table not found");
  }

  const columnIndex = table.columns.indexOf(columnName);
  if (columnIndex === -1) {
    return res.status(404).send("Column not found");
  }

  res.json({ columnIndex });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
