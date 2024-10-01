import { combineReducers } from 'redux';

const initialBooksState = {
  books: [], 
};

const booksReducer = (state = initialBooksState, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  books: booksReducer,
});

export default rootReducer;
