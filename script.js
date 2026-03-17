const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const copyBtn = document.getElementById('copy-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');

let quotes = [];

// Load quotes from JSON
async function loadQuotes() {
    try {
        const response = await fetch('quotes.json');
        quotes = await response.json();
        displayRandomQuote();
    } catch (error) {
        // Fallback quotes if loading fails
        quotes = [
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
            { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
            { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" }
        ];
        displayRandomQuote();
    }
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayRandomQuote() {
    const quote = getRandomQuote();
    
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = quote.author;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 200);
}

async function copyToClipboard() {
    const text = `${quoteText.textContent} — ${quoteAuthor.textContent}`;
    
    try {
        await navigator.clipboard.writeText(text);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        alert('Failed to copy. Please copy manually.');
    }
}

// Event listeners
copyBtn.addEventListener('click', copyToClipboard);
newQuoteBtn.addEventListener('click', displayRandomQuote);

// Load quotes on page load
loadQuotes();
