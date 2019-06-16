// Code out an event listener for the button that logs "Button pressed!" to the console when it is clicked
const bookButton = document.querySelector("#mainButton")
const searchField = document.querySelector("input#userInput")
const goodBookWrapper = document.querySelector("#good")
const badBookWrapper = document.querySelector("#bad")
const APIkey = "AIzaSyBFmfIqWopQY3E0W1XYpky0gjOahf32YKU"

bookButton.addEventListener('click', (e) => {
  let userSearch = searchField.value
  console.log(userSearch);
  sendApiRequestGoodBooks(userSearch);
  sendApiRequestBadBooks(userSearch);
})

// Go to https://developers.giphy.com/ and create an account. Then create your first app called testApp to create an API key. Enter it below.
async function sendApiRequestGoodBooks(keyword) {
  goodBookWrapper.innerHTML= ""
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=${APIkey}&maxResults=40`);
  console.log(response);
  let books = await response.json();
  console.log(books);
  const times = 40;
  for (i = 0; i < times; i++) {
    if (books.items[i].volumeInfo.averageRating >= 4){
      const bookURL = books.items[i].volumeInfo.imageLinks.thumbnail
      const GoogleBooksLink = books.items[i].volumeInfo.canonicalVolumeLink
      console.log(bookURL)
      console.log(GoogleBooksLink)
      addBooksToScreen(bookURL, goodBookWrapper, GoogleBooksLink)
    }
  }
};

async function sendApiRequestBadBooks(keyword) {
  badBookWrapper.innerHTML= ""
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=${APIkey}&maxResults=40`)
  console.log(response);
  let books = await response.json();
  console.log(books);
      const times = 40;
      for (i = 0; i < times; i++) {
        if (books.items[i].volumeInfo.averageRating <= 2){
          const bookURL = books.items[i].volumeInfo.imageLinks.thumbnail
          const GoogleBooksLink = books.items[i].volumeInfo.canonicalVolumeLink
          console.log(bookURL)
          console.log(GoogleBooksLink)
          addBooksToScreen(bookURL, badBookWrapper, GoogleBooksLink)
        }
      }
};


function addBooksToScreen(imageURL, wrapper, GBurl) {
  console.log(wrapper)
  wrapper.innerHTML += `<a href="${GBurl}"><img src="${imageURL}">`
};

