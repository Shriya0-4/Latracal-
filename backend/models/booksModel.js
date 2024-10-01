const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: [{ type: String }],
    publisher: { type: String },
    publication_year: { type: Number },
    edition: { type: String },
    number_of_pages: { type: Number },
    genres: [{ type: String }],
    description: { type: String },
    cover_image_url: { type: String },
    rating: { type: Number },
    reviews: { type: String }
});

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;
