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
    const storedBooks = [
      { title: 'Book 1', author: 'Jhone Doa', isbn: 123 },
      { title: 'Book 2', author: 'Jagath', isbn: 456 },
      { title: 'Book 3', author: 'Charith', isbn: 789 },
    ];

    const books = storedBooks;
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
    }
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

  const newBook = new Book(title, author, isbn);

  UI.addBook(newBook);

  //clear Fields
  UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});
