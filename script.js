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

// DOM Elements
const libraryDisplay = document.getElementById("libraryDisplay");
const newBookBtn = document.getElementById("newBookBtn");
const bookFormDialog = document.getElementById("bookFormDialog");
const bookForm = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

// Show form
newBookBtn.addEventListener("click", () => {
  bookFormDialog.showModal();
});

// Close form
cancelBtn.addEventListener("click", () => {
  bookFormDialog.close();
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

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

// Display books
function displayArray(libraryArray) {
  libraryDisplay.innerHTML = "";

  libraryArray.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.readBook ? "Read" : "Not Read"}</p>
      <button class="toggle-read-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    libraryDisplay.appendChild(card);
  });
}

// Handle remove and toggle actions
libraryDisplay.addEventListener("click", (event) => {
  const target = event.target;
  const card = target.closest(".book-card");
  if (!card) return;

  const bookId = card.dataset.id;
  const bookIndex = myLibrary.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) return;

  if (target.classList.contains("toggle-read-btn")) {
    myLibrary[bookIndex].toggleReadStatus();
    displayArray(myLibrary);
  }

  if (target.classList.contains("remove-btn")) {
    myLibrary.splice(bookIndex, 1);
    displayArray(myLibrary);
  }
});
