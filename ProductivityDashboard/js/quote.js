function initQuote() {
  let quoteText = document.querySelector("#quoteText");
  let quoteAuthor = document.querySelector("#quoteAuthor");
  let newQuoteBtn = document.querySelector("#newQuoteBtn");

  async function fetchQuote() {
    try {
      let response = await fetch("https://dummyjson.com/quotes/random");

      let data = await response.json();
      
      quoteText.textContent = data.quote;
      quoteAuthor.textContent = `— ${data.author}`;
    } catch(error){
      console.error(error);
      quoteText.textContent = "Failed to load quote.";
      quoteAuthor.textContent = "";
    }
  }
  fetchQuote();
  newQuoteBtn.addEventListener("click", () => {
    fetchQuote();
  });
}

export default initQuote;
