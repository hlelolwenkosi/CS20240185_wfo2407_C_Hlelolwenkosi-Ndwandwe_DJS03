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

  