import store from '../redux/store';
import {setBooks} from '../redux/reducers/books/booksSlice';
import {BookInfo} from './Types';
import LocalStorage from './index';

/**
 * @author Nejdet Dalaslan
 * This class was created for controlling book objects which
 * were saved on Local Storage
 * */
export class BookUtils {
  private static BKS = 'bks';
  private static books: BookInfo[] = [];

  /**
   * Adds a new book to the collection.
   * @param newBook - The book information to be added.
   * @param onSuccess - Callback function called upon successful addition of the book.
   * @param onFail - Callback function called if adding the book fails.
   */
  static addBook = (
    newBook: BookInfo,
    onSuccess: () => void,
    onFail: () => void,
  ) => {
    BookUtils.readBooks(() => {
      if (this.books && newBook.isbn) {
        if (!BookUtils.isBookAdded(newBook.isbn)) {
          this.books.push(newBook);
          LocalStorage.storeData(BookUtils.BKS, this.books);
          onSuccess();
        } else {
          onFail();
        }
      } else {
        LocalStorage.storeData(BookUtils.BKS, [newBook]);
        onSuccess();
      }
    });
  };

  /**
   * Removes a book from the collection based on the provided book information.
   * @param book - The book to be removed.
   * Note: This method does not update the storage directly; it filters the book
   * from the current collection in memory. Make sure to handle storage updates separately.
   */
  private static deleteBook = (book: BookInfo) => {
    this.books = this.books.filter(obj => obj.isbn !== book.isbn);
  };

  /**
   * Deletes a book from the collection and updates the storage and application state.
   * @param book - The book to be deleted.
   * Note: This method deletes the book from memory, updates the state using Redux,
   * and syncs the changes to the Local Storage.
   */
  public static deleteFromStorage = (book: BookInfo) => {
    BookUtils.deleteBook(book);
    store.dispatch(setBooks(this.books));
    LocalStorage.storeData(BookUtils.BKS, this.books);
  };

  /**
   * Modifies a book in the collection and updates the storage and application state.
   * @param newBook - The updated book information.
   * @param onSuccess - Callback function invoked upon successful editing of the book.
   * @param onFail - Callback function invoked if editing the book fails.
   * Note: This method follows a sequence: it removes the old version of the book,
   * updates the in-memory collection and storage, and then adds the updated book.
   */
  static editBook = (
    newBook: BookInfo,
    onSuccess: () => void,
    onFail: () => void,
  ) => {
    BookUtils.deleteBook(newBook);
    store.dispatch(setBooks(this.books));
    LocalStorage.storeData(BookUtils.BKS, this.books);
    BookUtils.addBook(
      newBook,
      () => {
        onSuccess();
      },
      () => {
        onFail();
      },
    );
  };

  /**
   * Checks if a book with a given ISBN exists in the collection.
   * @param isbn - The ISBN of the book to check.
   * @returns {boolean} - Indicates whether the book with the provided ISBN exists in the collection.
   * @return {true} if book exists otherwise {false}
   */
  private static isBookAdded = (isbn: string): boolean => {
    const foundUser = this.books.find(book => book.isbn === isbn);
    return !!foundUser;
  };

  /**
   * Reads and retrieves the book collection from Local Storage.
   * @param onCallBack - A callback function invoked after reading the books.
   * Note: This method retrieves data from Local Storage using asynchronous operations.
   * Upon successful retrieval, it assigns the retrieved book collection to the in-memory 'books' array
   * and triggers the provided callback to signal the completion of the operation.
   */
  private static readBooks = (onCallBack: () => void) => {
    LocalStorage.getData<BookInfo[]>(this.BKS).then(result => {
      this.books = result;
      onCallBack();
    });
  };

  /**
   * Synchronizes the application state in Redux with the book collection retrieved from storage.
   * Note: This method asynchronously reads the book collection from storage,
   * and upon completion, updates the Redux store with the retrieved books.
   */
  public static syncRedux = () => {
    BookUtils.readBooks(() => {
      store.dispatch(setBooks(this.books));
    });
  };
}
