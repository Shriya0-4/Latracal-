import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILURE,
} from '../actions/BookActions';

const initialState = {
    loading: false,
    books: [],
    error: '',
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
        case ADD_BOOK_REQUEST:
        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state,
                loading: false,
                books: action.payload,
                error: '',
            };
        case FETCH_BOOKS_FAILURE:
        case ADD_BOOK_FAILURE:
        case ADD_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                books: [...state.books, action.payload],
                error: '',
            };
        case ADD_REVIEW_SUCCESS:
            const updatedBooks = state.books.map((book) => {
                if (book._id === action.payload._id) {
                    return { ...book, reviews: action.payload.reviews };
                }
                return book;
            });
            return {
                ...state,
                loading: false,
                books: updatedBooks,
                error: '',
            };
        default:
            return state;
    }
};

export default bookReducer;
