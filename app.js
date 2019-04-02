//Book Constructor
function Book(title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

//UI Constructor
function UI() {

}

//LocalStorage Constructor 
function Store() {

    //Get books from localstorage
    this.getBooks = function() {

        let books;

        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    //Display book to UI
    this.displayBooks = function() {

        const books = this.getBooks();

        books.forEach(function(book) {
            
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    //Add book to localstorage
    this.addBook = function(book) {

        const books = this.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    //Delete book from localstorage
    this.removeBook = function(isbn) {
        
        const books = this.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books', JSON.stringify(books));

    }

}

//Add book to the list
UI.prototype.addBookToList = function(book) {

    const list = document.querySelector('#book-list');

    //Create tr element
    const row = document.createElement('tr');

    //Insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"><i class="far fa-trash-alt"></i></a></td>
    `

    //Append list to DOM
    list.appendChild(row);
}

//Show alert message
UI.prototype.showAlert = function(message, className) {
    
    //Create div
    const div = document.createElement('div');

    //Add classes
    div.className = `alert ${className}`;

    //Add text
    div.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector('.container');

    //Get form
    const form = document.querySelector('#book-form');

    //Insert div
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete book
UI.prototype.deleteBook = function(target) {
    
    if(target.classList.contains('fa-trash-alt')) {
        target.parentElement.parentElement.parentElement.remove();
    }

}

//Clear fields
UI.prototype.clearFields = function() {

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', function() {
    //Instantiate localstorage
    const ls = new Store();

    ls.displayBooks();
});

//Event Listeners for add book
document.querySelector('#book-form').addEventListener('submit', function(event) {
    
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Instantiate Local Storage
    const ls = new Store();

    //Validate
    if(title === '' || author === '' || isbn === '') {
        
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {

        //Add book to list
        ui.addBookToList(book);

        //Add book to Local Storage
        ls.addBook(book);

        //Show success
        ui.showAlert('Book added!', 'success');

        //Clear fields
        ui.clearFields();
    }

   
    event.preventDefault();
});

//Event Listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {

    //Instantiate UI
    const ui = new UI();

    //Instantiate localstorage
    const ls = new Store();

    //Delete book
    ui.deleteBook(e.target);

    //Delete book from localstorage
    ls.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

    //Show message
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();
});