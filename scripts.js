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
  
  // Event listener for settings form submission
document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    const colorDark = theme === "night" ? "255, 255, 255" : "10, 10, 20";
    const colorLight = theme === "night" ? "10, 10, 20" : "255, 255, 255";
    document.documentElement.style.setProperty("--color-dark", colorDark);
    document.documentElement.style.setProperty("--color-light", colorLight);
    document.querySelector("[data-settings-overlay]").open = false;
  });

  // Event listener for search form submission
document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = books.filter(
      ({ title, author, genres }) =>
        (filters.title.trim() === "" ||
          title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || author === filters.author) &&
        (filters.genre === "any" || genres.includes(filters.genre))
    );
    document.querySelector("[data-list-message]").classList[result.length < 1 ? "add" : "remove"]("list__message_show");
    document.querySelector("[data-list-items]").innerHTML = "";
    renderBooks(result, BOOKS_PER_PAGE);
    document.querySelector("[data-list-button]").disabled = result.length <= BOOKS_PER_PAGE;
    document.querySelector("[data-list-button]").innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${Math.max(result.length - BOOKS_PER_PAGE, 0)})</span>
    `;
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });
  