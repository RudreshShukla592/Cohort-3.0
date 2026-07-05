// quote.js — Motivation Quote feature (Fetch API).

const API_URL = 'https://api.quotable.io/random';

// Used if the network/API fails — keeps the UI useful instead of blank/broken.
const FALLBACK_QUOTES = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  { text: 'Small daily improvements lead to staggering long-term results.', author: 'Robin Sharma' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
];

let hasFetchedOnce = false;

export function initQuote() {
  const textEl = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const card = document.getElementById('quoteCard');
  const newQuoteBtn = document.getElementById('newQuoteBtn');

  newQuoteBtn.addEventListener('click', () => fetchQuote(textEl, authorEl, card, newQuoteBtn));

  // Fetch once automatically the first time this panel is opened.
  document.addEventListener('feature:opened', (event) => {
    if (event.detail.name === 'quote' && !hasFetchedOnce) {
      hasFetchedOnce = true;
      fetchQuote(textEl, authorEl, card, newQuoteBtn);
    }
  });
}

async function fetchQuote(textEl, authorEl, card, button) {
  setLoading(card, button, true);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Bad response');

    const data = await response.json();
    renderQuote(textEl, authorEl, data.content, data.author);
  } catch (error) {
    // Network/API failure — fall back to a local quote so the UI never breaks.
    const fallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    renderQuote(textEl, authorEl, fallback.text, `${fallback.author} (offline)`);
  } finally {
    setLoading(card, button, false);
  }
}

function renderQuote(textEl, authorEl, text, author) {
  textEl.textContent = `“${text}”`;
  authorEl.textContent = author ? `— ${author}` : '';
}

function setLoading(card, button, isLoading) {
  card.classList.toggle('loading', isLoading);
  button.disabled = isLoading;
  button.textContent = isLoading ? 'Loading…' : 'New Quote';
}
