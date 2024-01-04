import {BookInfo, UserInfo} from './Types';
import LocalStorage from './index';
import store from '../redux/store';
import {setBooks} from '../redux/reducers/books/booksSlice';

export class BookUtils {
  private static BKS = 'bks';
  private static books: BookInfo[] = [];

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
  private static deleteBook = (book: BookInfo) => {
    this.books = this.books.filter(obj => obj.isbn !== book.isbn);
  };

  public static deleteFromStorage = (book: BookInfo) => {
    BookUtils.deleteBook(book);
    store.dispatch(setBooks(this.books));
    LocalStorage.storeData(BookUtils.BKS, this.books);
  }

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

  private static isBookAdded = (isbn: string) => {
    const foundUser = this.books.find(book => book.isbn === isbn);
    return !!foundUser;
  };

  private static readBooks = (onCallBack: () => void) => {
    LocalStorage.getData<BookInfo[]>(this.BKS).then(result => {
      this.books = result;
      onCallBack();
    });
  };

  public static syncRedux = () => {
    BookUtils.readBooks(() => {
      store.dispatch(setBooks(this.books));
    });
  };
}
