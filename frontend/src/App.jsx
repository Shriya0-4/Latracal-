import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Hero from './components/hero'
import Books from './components/books'
import BookDetail from './components/BookDetail';
function App() {
  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App