// InkRealm - UI Functions
// © 2026 Tawananyasha Nzombe. All Rights Reserved.

function initializeLibrary() {
    // Load books into grid
    const booksGrid = document.getElementById('booksGrid');
    if (booksGrid) {
        books.forEach(book => {
            booksGrid.appendChild(createBookCard(book));
        });
    }

    // Load original novels
    const originalGrid = document.getElementById('originalGrid');
    if (originalGrid) {
        originalNovels.forEach(novel => {
            const card = createBookCard(novel);
            card.classList.add('original-book');
            originalGrid.appendChild(card);
        });
    }

    // Load genres
    const genreGrid = document.getElementById('genreGrid');
    if (genreGrid) {
        genres.forEach(genre => {
            const card = document.createElement('div');
            card.className = 'genre-card';
            card.innerHTML = `
                <i class="${genre.icon}"></i>
                <h3>${genre.name}</h3>
                <p>${genre.count} books</p>
            `;
            card.addEventListener('click', () => {
                filterByGenre(genre.name);
            });
            genreGrid.appendChild(card);
        });
    }
}

function filterByGenre(genreName) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';
    
    const filteredBooks = [...books, ...originalNovels].filter(
        book => book.genre === genreName
    );
    
    if (filteredBooks.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found in this genre.</p>`;
    } else {
        filteredBooks.forEach(book => {
            grid.appendChild(createBookCard(book));
        });
    }
    
    // Scroll to library section
    setTimeout(() => {
        scrollToSection('library');
    }, 100);
}

// Add smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.book-card, .genre-card, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

window.addEventListener('load', () => {
    setTimeout(animateOnScroll, 500);
});

// Navigation active state
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// Print/Export functionality
function exportLibrary() {
    const userData = {
        profile: userProfile,
        books: books,
        originalNovels: originalNovels,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'inkrealm-library.json';
    link.click();
}

// Share functionality
function shareBook(bookId) {
    const book = [...books, ...originalNovels].find(b => b.id === bookId);
    if (book) {
        const text = `Check out "${book.title}" by ${book.author} on InkRealm! Rating: ${book.rating}/5 ⭐`;
        if (navigator.share) {
            navigator.share({
                title: 'InkRealm',
                text: text,
                url: window.location.href
            });
        } else {
            alert('Share: ' + text);
        }
    }
}
