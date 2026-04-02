const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Temporary Data Storage
let records = [];

/*
FORMAT OF RECORD:
{
  id: number,
  title: string,
  amount: number,
  category: string,
  type: "income" | "expense",
  createdAt: date
}
*/

//  CREATE RECORD
app.post("/records", (req, res) => {
  const { title, amount, category, type } = req.body;

  if (!title || !amount || !category || !type) {
    return res.status(400).json({ error: "All fields required" });
  }

  const record = {
    id: Date.now(),
    title,
    amount,
    category,
    type,
    createdAt: new Date(),
  };

  records.push(record);

  res.json(record);
});

// GET ALL RECORDS (with filtering + pagination)
app.get("/records", (req, res) => {
  let { page = 1, limit = 5, type, category } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = records;

  // filter by type
  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }

  // filter by category
  if (category) {
    filtered = filtered.filter((r) => r.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json(filtered.slice(start, end));
});

// GET SINGLE RECORD
app.get("/records/:id", (req, res) => {
  const record = records.find((r) => r.id == req.params.id);

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.json(record);
});

// UPDATE RECORD
app.put("/records/:id", (req, res) => {
  const record = records.find((r) => r.id == req.params.id);

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  const { title, amount, category, type } = req.body;

  if (title) record.title = title;
  if (amount) record.amount = amount;
  if (category) record.category = category;
  if (type) record.type = type;

  res.json(record);
});

// DELETE RECORD
app.delete("/records/:id", (req, res) => {
  records = records.filter((r) => r.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});

// DASHBOARD SUMMARY
app.get("/summary", (req, res) => {
  let income = 0;
  let expense = 0;

  records.forEach((r) => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
  });
});

// ROOT
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
