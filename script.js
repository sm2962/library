const myLibrary = [];

function Book(title, author, pages, readBook) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readBook = readBook;
}

Book.prototype.toggleReadStatus = function () {
  this.readBook = !this.readBook;
};

// DOM elements
const libraryDisplay = document.getElementById("libraryDisplay");
const newBookBtn = document.getElementById("newBookBtn");
const bookFormDialog = document.getElementById("bookFormDialog");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

// Show modal on New Book button click
newBookBtn.addEventListener("click", () => {
  bookFormDialog.showModal();
});

// Close modal on Cancel button
cancelBtn.addEventListener("click", () => {
  bookFormDialog.close();
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent form from reloading the page

  const formData = new FormData(bookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = parseInt(formData.get("pages"));
  const readBook = formData.get("readBook") === "on";

  const newBook = new Book(title, author, pages, readBook);
  myLibrary.push(newBook);

  displayArray(myLibrary);

  bookForm.reset();
  bookFormDialog.close();
});

// Render books to the page
function displayArray(libraryArray) {
  libraryDisplay.innerHTML = "";

  libraryArray.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.readBook ? "Read" : "Not Read"}</p>
    `;
    libraryDisplay.appendChild(card);
  });
}

