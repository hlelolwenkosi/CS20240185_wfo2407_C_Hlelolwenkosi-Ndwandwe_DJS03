import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// Function to create HTML elements with specified attributes and innerHTML
const createElement = (tag, attributes, innerHTML) => {
    const element = document.createElement(tag); // Create the specified HTML element
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    element.innerHTML = innerHTML;
    return element;
  };

  // Function to render dropdown options based on provided data
const renderOptions = (data, selector, defaultValue) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createElement("option", { value: "any" }, defaultValue));
    Object.entries(data).forEach(([id, name]) =>
      fragment.appendChild(createElement("option", { value: id }, name))
    );
    document.querySelector(selector).appendChild(fragment);
  };
  
  // Function to render books with preview information
const renderBooks = (matches, limit) => {
    const fragment = document.createDocumentFragment();
    matches.slice(0, limit).forEach(({ author, id, image, title }) => {
      const element = createElement(
        "button",
        { class: "preview", "data-preview": id },
        `<img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>`
      );
      fragment.appendChild(element);
    });
    document.querySelector("[data-list-items]").appendChild(fragment);
  };

  // Initial rendering of books and dropdown options
renderBooks(books, BOOKS_PER_PAGE);
renderOptions(genres, "[data-search-genres]", "All Genres");
renderOptions(authors, "[data-search-authors]", "All Authors");

// Function to handle canceling search and settings overlays
const handleCancel = (selector) => () => {
    document.querySelector(selector).open = false;
  };
  
  // Event listeners for cancel buttons
document.querySelector("[data-search-cancel]").addEventListener("click", handleCancel("[data-search-overlay]"));
document.querySelector("[data-settings-cancel]").addEventListener("click", handleCancel("[data-settings-overlay]"));

// Event listener to open search overlay and focus on the search input
document.querySelector("[data-header-search]").addEventListener("click", () => {
    document.querySelector("[data-search-overlay]").open = true;
    document.querySelector("[data-search-title]").focus();
  });
  
// Event listener to open settings overlay
  document.querySelector("[data-header-settings]").addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });
  