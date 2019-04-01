//Book Constructor
function Book(title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

//UI Constructor
function UI() {

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

//Clear fields
UI.prototype.clearFields = function() {

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

//Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(event) {
    
    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === '') {
        
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {

        //Add book to list
        ui.addBookToList(book);

        //Show success
        ui.showAlert('Book added!', 'success');

        //Clear fields
        ui.clearFields();
    }

   
    event.preventDefault();
});