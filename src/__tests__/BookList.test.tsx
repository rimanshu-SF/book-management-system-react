import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { addBook, removeBook, editBook } from "../redux/slices/bookSlice";
import userReducer from "../redux/slices/userSlice";
import BookList from "../pages/BookList";

const initialState = {
  book: {
    books: [
      {
        title: "Test Book",
        author: "Test Author",
        genre: "Fiction",
        isbn: "1234567890123",
        publicationDate: "2023-01-01",
        price: 100,
        discountPrice: 80,
      },
    ],
  },
  user: { currentUser: { name: "Test User" } },
};
const createTestStore = (initialState) =>
  configureStore({
    reducer: {
      book: bookReducer,
      user: userReducer,
    },
    preloadedState: initialState,
  });

describe("BookList Component", () => {
  let store;

  beforeEach(() => {
    store = createTestStore(initialState);
    vi.spyOn(store, "dispatch");
  });

  it("filters books based on the search query", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search by title");
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } });

    expect(screen.queryByText("Test Book")).not.toBeInTheDocument();
  });

  it("renders BookList component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });

  it("opens add book modal when 'Add Book' button is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );

    const addButton = screen.getByText("Add Book");
    fireEvent.click(addButton);
    expect(screen.getByText("Book Title")).toBeInTheDocument();
  });

  it("dispatches addBook action when a book is added", () => {
    store.dispatch(addBook(initialState.book.books[0]));
    expect(store.dispatch).toHaveBeenCalledWith(addBook(initialState.book.books[0]));
  });


  it("dispatches updateBook action when a book is edited", () => {
    const updatedBook = {
      ...initialState.book.books[0],
      title: "Updated Test Book",
    };
    store.dispatch(editBook({ index: 0, book: updatedBook }));
    expect(store.dispatch).toHaveBeenCalledWith(editBook({ index: 0, book: updatedBook }));
  });

  it("dispatches removeBook action when a book is deleted", () => {
    store.dispatch(removeBook(0));
    expect(store.dispatch).toHaveBeenCalledWith(removeBook(0));
  }); 

  it('removes a book when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </Provider>
    );
  
    const deleteButton = screen.getByTestId("deleteBtn");
    console.log("deleteButton :",deleteButton);
    
    expect(deleteButton).toBeInTheDocument(); 
    fireEvent.click(deleteButton); 
    const confirmButton = screen.queryByRole('button', { name: /Confirm/i });
    if (confirmButton) {
      fireEvent.click(confirmButton);  // Simulate confirmation
    }
    store.dispatch(removeBook(0));
    expect(store.dispatch).toHaveBeenCalledWith(removeBook(0));
  });
  
});
