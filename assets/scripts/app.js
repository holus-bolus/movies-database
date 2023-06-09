const addMovieModal = document.getElementById('add-modal');
// const startAddMovieButton = document.querySelector("header").lastElementChild;
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const renderNewMovieElement = (title, imageURL, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
     <div class="movie-element__image">
            <img src="${imageURL}" alt="${title}">
      </div>
      <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating} / 5</p>
        </div>
  `;
  const listRoot = document.getElementById('movie-list');
  listRoot.appendChild(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInputs();
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim() === '' ||
    imageUrlValue === '' ||
    ratingValue === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter the value between 1 and 5');
    return;
  }
  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInputs();
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
