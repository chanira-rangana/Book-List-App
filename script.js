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
    books.forEach((book) => {
      htmlTemplate += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        </tr>
    `;

      const list = document.querySelector('#book-list');
      list.innerHTML = htmlTemplate;
    });
  }
}

//Event display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
