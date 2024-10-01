import axios from 'axios';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';



export const fetchBooks = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_BOOKS_REQUEST });
        try {
            const response = await axios.get('http://localhost:3000/books');
            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
        }
    };
};

export const addBook = (book) => {
    return async (dispatch) => {
        dispatch({ type: ADD_BOOK_REQUEST });
        try {
            const response = await axios.post('http://localhost:3000/books', book);
            dispatch({ type: ADD_BOOK_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_BOOK_FAILURE, payload: error.message });
        }
    };
};

