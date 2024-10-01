import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Books() {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredBooks, setFilteredBooks] = useState(books); 

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        dispatch({ type: 'SET_BOOKS', payload: response.data });
      } catch (error) {
        console.log('Error fetching books', error);
      }
    };

    getBooks();
  }, [dispatch]);

  useEffect(() => {
    const results = books.filter(book => 
      Array.isArray(book.genres) 
        ? book.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase())) 
        : book.genres.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    setFilteredBooks(results);
  }, [searchQuery, books]); 

  return (
    <div className="container mx-auto p-4">
 
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Author:</strong> {book.author.join(', ')}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p className="text-yellow-500 font-bold">Rating: {book.rating}/5</p>
              <div className='mt-auto text-right'>
              <Link to={`/books/${book._id}`} className='mt-6 hover:text-blue-700'>See More</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
}

export default Books;
