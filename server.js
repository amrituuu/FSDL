const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON data from request body
app.use(express.json());

// Temporary in-memory database
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" }
];

// GET request - fetch all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET request - fetch single book by id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST request - add new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});