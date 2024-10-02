import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../actions/BookActions';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState({
        name: 'John Doe',
        role: 'user',
    });

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        cover_image_url: '',
        publication_year: '',
        publisher: '',
        edition: '',
        number_of_pages: '',
        genres: '',
        description: '',
        rating: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleAddBook = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(addBook(newBook)); 
            setNewBook({ 
                title: '',
                author: '',
                cover_image_url: '',
                publication_year: '',
                publisher: '',
                edition: '',
                number_of_pages: '',
                genres: '',
                description: '',
                rating: '',
            });
            alert('Book added successfully!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        setUser({ ...user, role: newRole });
    };

    return (
        <>
            <nav className='flex flex-row justify-between items-center text-large w-full h-16 bg-indigo-800 shadow-lg'>
                <a href="/" className='ml-4 text-white font-bold text-lg'>shelf talk</a>
                <div className='flex flex-row justify-center items-center'>
                    <a href="/books" className='m-4 text-white hover:text-gray-300 transition-colors duration-300'>Browse Books</a>
                    <button onClick={toggleMenu} className='m-4 text-white hover:text-gray-300 transition-colors duration-300'>Profile</button>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="absolute top-16 w-64 p-6 right-0 bg-white shadow-md rounded">
                    <div className="mb-4">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Select Role:</label>
                        <select value={user.role} onChange={handleRoleChange} className="border rounded p-1">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {user.role === 'admin' && (
                        <form onSubmit={handleAddBook} className="mt-2">
                            <h4 className="font-semibold">Add a New Book</h4>
                            {error && <div className="text-red-500">{error}</div>}
                            <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <input type="text" name="cover_image_url" placeholder="Cover Image URL" value={newBook.cover_image_url} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" />
                            <input type="number" name="publication_year" placeholder="Publication Year" value={newBook.publication_year} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <input type="text" name="publisher" placeholder="Publisher" value={newBook.publisher} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <input type="text" name="edition" placeholder="Edition" value={newBook.edition} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" />
                            <input type="number" name="number_of_pages" placeholder="Number of Pages" value={newBook.number_of_pages} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" />
                            <input type="text" name="genres" placeholder="Genres (comma separated)" value={newBook.genres} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <textarea name="description" placeholder="Description" value={newBook.description} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" />
                            <input type="number" name="rating" placeholder="Rating (1-5)" value={newBook.rating} onChange={handleInputChange} className="border rounded p-1 w-full mb-2" required />
                            <button type="submit" className={`mt-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white px-4 py-2 rounded`} disabled={loading}>
                                {loading ? 'Adding...' : 'Add Book'}
                            </button>
                        </form>
                    )}
                    <ul className="mt-4">
                        <li className="mb-2">
                            <a href="#profile" className="text-blue-500">Profile Overview</a>
                        </li>
                        <li className="mb-2">
                            <a href="#settings" className="text-blue-500">Settings</a>
                        </li>
                        <li>
                            <a href="#logout" className="text-blue-500">Logout</a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Navbar;
