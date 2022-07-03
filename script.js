// Book class: Represent Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    let htmlTemplate = ``;
    books.forEach((book) => UI.addBook(book));
  }

  static addBook(book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    const list = document.querySelector('#book-list');
    list.appendChild(tr);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();

      UI.showMessage('Successfullt delete Book', 'delete');
    }
  }

  static showMessage(message, type) {
    let text = '';
    switch (type) {
      case 'success':
        text = message;
        break;
      case 'error':
        text = message;
        break;
      case 'delete':
        text = message;
        break;
      default:
        text = 'Invalid argument(parameter)';
        break;
    }
    document.querySelector(`#${type}`).style.display = 'block';
    document.querySelector(`#${type}`).innerHTML = text;
    setTimeout(() => {
      document.querySelector(`#${type}`).style.display = 'none';
    }, 3000);
  }
}

//Handle localstorage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        // At position index, remove 1 item:
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event form Submit (Add a Book)
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault;
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validate
  if (title === '' || author === '' || isbn === '') {
    UI.showMessage('Fill all required fields', 'error');
  } else {
    const newBook = new Book(title, author, isbn);

    //add Book to UI
    UI.addBook(newBook);

    //add Book to Localstore
    Store.addBook(newBook);

    //show success mesage
    UI.showMessage('Successfully add new Book', 'success');

    //clear Fields
    UI.clearFields();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  //remove book from UI
  UI.deleteBook(e.target);

  //remove book from localstorage
  Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);

  /*
    previousElementSibling => previus list element
  */
});
