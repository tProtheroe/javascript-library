const form = document.getElementById('form');

const addButton = document.getElementById('add-button')
const title = document.getElementById('bookname');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const isRead = document.getElementById('isread');
const submit = document.getElementById('submit');

const formContainer = document.getElementById('form-container');
const cardContainer = document.getElementById('card-container');

const myLibrary = [];


class Book{
  constructor(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  addBookToLibrary(){
    myLibrary.push(this);
  }

  changeRead(){
    console.log(this);
    if(this.isRead == true){
      this.isRead = false;
    } else {
      this.isRead = true;
    }
    displayCards();
  }
}

myLibrary.push(new Book("The Hobbit", "J. R. R. Tolken", 200, true));
myLibrary.push(new Book("Harry Potter", "J. K. Rowling", 200, true));
myLibrary.push(new Book("Models", "Mark Mason", 200, true));
myLibrary.push(new Book("Greenlights", "Matthew McConaughey", 200, false));
myLibrary.push(new Book("A Promised Land", "Barack Obama", 200, false));
myLibrary.push(new Book("The Food Lab", "J. Kenji Lopez-Alt", 200, false));

// UNABLE TO GET VALIDATION TO WORK YET, COME BACK LATER
// function validateForm(){
//   let elements = form.elements;

//   Array.from(elements).forEach(element => {
//     console.log(element.value)
//     if(element.value == "" || element.value == false){
//       alert("Please fill out all fields.");
//       return false;
//     }
//   });
// }

function createCard(book){
  let newCard = document.createElement('div');
  let newTitle = document.createElement('h3');
  let newAuthor = document.createElement('h4');
  let newPages = document.createElement('span');
  let newIsRead = document.createElement('p');
  let newDelete = document.createElement('button');
  let newChangeRead = document.createElement('button');

  newCard.className = "book-card";
  newTitle.className = "book-title";
  newAuthor.className = "author";
  newPages.className = "pages";
  newIsRead.className = "isread";
  newDelete.className = "card-button delete";
  newChangeRead.className = "card-button change-read"

  newTitle.textContent = book.title;
  newAuthor.textContent = book.author;
  newPages.textContent = book.pages;
  newIsRead.textContent = (book.isRead == true) ? "Read" : "Not read";
  newDelete.textContent = "Remove Book";
  newChangeRead.textContent = "Change Read";
  newCard.dataset.index = myLibrary.indexOf(book);

  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newIsRead);
  newCard.appendChild(newDelete);
  newCard.appendChild(newChangeRead);

  cardContainer.appendChild(newCard);

  newCard.querySelector(".delete").addEventListener("click", () => {
    deleteBook(newCard.dataset.index);
    newCard.remove();
  });

  newCard.querySelector(".change-read").addEventListener("click", () => {
    book.changeRead();
  });
}

function createNewBook(){
  let newBook = new Book(title.value, author.value, pages.value, isRead.checked);

  newBook.addBookToLibrary();
  form.reset();
  formContainer.style.display = 'none';
  createCard(newBook);
}

function deleteBook(index){
  myLibrary.splice(index, 1);
  displayCards();
  console.log(myLibrary);
}

function clearCards(){
  cardContainer.innerHTML = '';
}

function displayCards(){
  clearCards();
  myLibrary.forEach(book => {
    createCard(book);
  })
  console.log(myLibrary);
}

document.addEventListener('DOMContentLoaded', () => {
  displayCards();
  submit.addEventListener('click', createNewBook);

  addButton.addEventListener('click', function() {
    formContainer.style.display = 'flex';
  });
})

//IT WAS HARD BUT YOU GOT THERE WELL DONE, NOW ADD BUTTON CHANGE READ STATUS