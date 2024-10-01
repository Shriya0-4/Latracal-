import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleReviewSubmit = async () => {
    if (!newReview) return;

    try {
      await axios.put(`http://localhost:3000/books/${id}/reviews`, {
        review: newReview,
      });
      setNewReview(''); 
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      setBook(response.data);
    } catch (error) {
      setError('Error adding review');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <div className="container p-4 bg-indigo-700 shadow-lg">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold mb-4">{book.title}</h2>
        <img
          src={book.cover_image_url}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p><strong>Author:</strong> {book.author.join(', ')}</p>
        <p><strong>Publisher:</strong> {book.publisher}</p>
        <p><strong>Publication Year:</strong> {book.publication_year}</p>
        <p><strong>Edition:</strong> {book.edition}</p>
        <p><strong>Number of Pages:</strong> {book.number_of_pages}</p>
        <p><strong>Genres:</strong> {book.genres.join(', ')}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p className="text-yellow-500 font-bold">Rating: {book.rating}/5</p>
        <p><strong>Reviews:</strong> {book.reviews}</p>

        {/* Add Review Section */}
        <div className="mt-4">
          <textarea
            value={newReview}
            onChange={handleReviewChange}
            placeholder="Add your review here"
            className="border rounded-md p-2 w-full"
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Add Review</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
