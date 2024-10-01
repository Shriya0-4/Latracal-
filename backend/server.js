const express = require('express');
const app = express();
const Books = require('./models/booksModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT;
const mongoConnection=process.env.MONGO_CONNECTION;
mongoose.connect(mongoConnection)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('Error in connecting to DB'));

app.use(cors());
app.use(express.json()); 

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        console.log(book)
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/books', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books from DB', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.put('/books/:id/reviews', async (req, res) => {
    const { review } = req.body;
    try {
        const book = await Books.findById(req.params.id);
        if (!book) {
            return res.status(404).send('Book not found');
        }

        book.reviews = book.reviews ? `${book.reviews}\n${review}` : review;
        await book.save();

        res.json(book);
    } catch (error) {
        console.error('Error updating book reviews:', error);
        res.status(500).send('Server error');
    }
});

app.post('/books', async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = new Books(bookData);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding book to DB', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
