// InkRealm - Main JavaScript
// © 2026 Tawananyasha Nzombe. All Rights Reserved.

let currentBook = null;
let userProfile = {
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    favoriteGenre: localStorage.getItem('favoriteGenre') || '',
    bookShelves: JSON.parse(localStorage.getItem('bookShelves')) || {
        reading: [],
        completed: [],
        wishlist: [],
        favorites: []
    }
};

// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search Functionality
const searchBox = document.getElementById('searchBox');
if (searchBox) {
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        performSearch(searchTerm);
    });
}

function performSearch(term) {
    const allBooks = [...books, ...originalNovels];
    const results = allBooks.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
    );
    
    const grid = document.getElementById('booksGrid');
    if (grid) {
        grid.innerHTML = '';
        if (results.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found. Try another search.</p>';
        } else {
            results.forEach(book => {
                grid.appendChild(createBookCard(book));
            });
        }
    }
}

// Login
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        if (userProfile.username) {
            openUserModal();
        } else {
            openUserModal();
        }
    });
}

// Modal Functions
function openModal(book) {
    currentBook = book;
    const modal = document.getElementById('bookModal');
    const modalImage = document.getElementById('modalBookImage');
    const modalTitle = document.getElementById('modalBookTitle');
    const modalAuthor = document.getElementById('modalBookAuthor');
    const modalRating = document.getElementById('modalBookRating');
    const modalStars = document.getElementById('modalStars');
    const modalDescription = document.getElementById('modalBookDescription');
    const modalPages = document.getElementById('modalBookPages');
    const modalYear = document.getElementById('modalBookYear');
    const modalGenre = document.getElementById('modalBookGenre');

    modalImage.src = book.image || generateBookCover(book.title);
    modalTitle.textContent = book.title;
    modalAuthor.textContent = `by ${book.author}`;
    modalRating.textContent = `${book.rating} / 5.0`;
    modalStars.innerHTML = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));
    modalDescription.textContent = book.description;
    modalPages.textContent = book.pages || 'N/A';
    modalYear.textContent = book.year || 'N/A';
    modalGenre.textContent = book.genre;

    loadReviews(book.id);
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

function openUserModal() {
    const modal = document.getElementById('userModal');
    document.getElementById('username').value = userProfile.username;
    document.getElementById('email').value = userProfile.email;
    document.getElementById('favoriteGenre').value = userProfile.favoriteGenre;
    modal.style.display = 'block';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

// User Profile Form
const userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userProfile.username = document.getElementById('username').value;
        userProfile.email = document.getElementById('email').value;
        userProfile.favoriteGenre = document.getElementById('favoriteGenre').value;
        
        localStorage.setItem('username', userProfile.username);
        localStorage.setItem('email', userProfile.email);
        localStorage.setItem('favoriteGenre', userProfile.favoriteGenre);
        
        alert('Profile saved successfully!');
        closeUserModal();
    });
}

// Book Shelf Functions
function addToShelf(shelf) {
    if (!userProfile.username) {
        alert('Please log in first!');
        openUserModal();
        return;
    }
    
    if (!userProfile.bookShelves[shelf].includes(currentBook.id)) {
        userProfile.bookShelves[shelf].push(currentBook.id);
        localStorage.setItem('bookShelves', JSON.stringify(userProfile.bookShelves));
        alert(`Added "${currentBook.title}" to ${shelf}!`);
    } else {
        alert('This book is already in your ' + shelf);
    }
}

function rateBook() {
    const rating = prompt('Rate this book (1-5):');
    if (rating && rating >= 1 && rating <= 5) {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
        if (!reviews[currentBook.id]) {
            reviews[currentBook.id] = [];
        }
        reviews[currentBook.id].push({
            author: userProfile.username,
            rating: rating,
            text: `Rated ${rating} stars`
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert('Rating submitted!');
        loadReviews(currentBook.id);
    }
}

function submitReview() {
    const reviewText = document.getElementById('reviewText').value;
    if (!reviewText.trim()) {
        alert('Please write a review!');
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    if (!reviews[currentBook.id]) {
        reviews[currentBook.id] = [];
    }
    
    reviews[currentBook.id].push({
        author: userProfile.username || 'Anonymous',
        text: reviewText
    });
    
    localStorage.setItem('reviews', JSON.stringify(reviews));
    document.getElementById('reviewText').value = '';
    loadReviews(currentBook.id);
    alert('Review posted!');
}

function loadReviews(bookId) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const reviewsList = document.getElementById('reviewsList');
    
    const bookReviews = reviews[bookId] || [];
    reviewsList.innerHTML = '';
    
    if (bookReviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
    } else {
        bookReviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-item';
            reviewDiv.innerHTML = `
                <div class="review-author">${review.author} ${review.rating ? `(${review.rating}★)` : ''}</div>
                <div class="review-text">${review.text}</div>
            `;
            reviewsList.appendChild(reviewDiv);
        });
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const bookModal = document.getElementById('bookModal');
    const userModal = document.getElementById('userModal');
    
    if (e.target === bookModal) {
        bookModal.style.display = 'none';
    }
    if (e.target === userModal) {
        userModal.style.display = 'none';
    }
});

// Generate book cover placeholder
function generateBookCover(title) {
    const colors = ['#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#0dcaf0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, 200, 300);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title.substring(0, 20), 100, 150);
    return canvas.toDataURL();
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <div class="book-cover">
            ${book.image ? `<img src="${book.image}" alt="${book.title}">` : book.title.substring(0, 1)}
        </div>
        <div class="book-info">
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <span class="book-genre">${book.genre}</span>
            <div class="book-rating">★ ${book.rating}/5</div>
        </div>
    `;
    card.addEventListener('click', () => openModal(book));
    return card;
}

// Initialize on load
window.addEventListener('load', () => {
    initializeLibrary();
    updateLoginButton();
});

function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (userProfile.username && loginBtn) {
        loginBtn.textContent = `👤 ${userProfile.username}`;
    }
}

// Shelf filtering
const shelfBtns = document.querySelectorAll('.shelf-btn');
shelfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        shelfBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const shelf = btn.dataset.shelf;
        filterByShelf(shelf);
    });
});

function filterByShelf(shelf) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';
    
    if (shelf === 'all') {
        books.forEach(book => {
            grid.appendChild(createBookCard(book));
        });
    } else {
        const shelfBooks = userProfile.bookShelves[shelf] || [];
        const booksInShelf = books.filter(book => shelfBooks.includes(book.id));
        
        if (booksInShelf.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Your ${shelf} is empty. Add some books!</p>`;
        } else {
            booksInShelf.forEach(book => {
                grid.appendChild(createBookCard(book));
            });
        }
    }
}
