// InkRealm - Books Database
// © 2026 Tawananyasha Nzombe. All Rights Reserved.

const books = [
    {
        id: 1,
        title: 'The Journey Home',
        author: 'Sarah Mitchell',
        genre: 'Fiction',
        rating: 4.5,
        pages: 320,
        year: 2023,
        description: 'A heartwarming tale of self-discovery and finding your place in the world.'
    },
    {
        id: 2,
        title: 'Midnight Mysteries',
        author: 'James Anderson',
        genre: 'Mystery',
        rating: 4.8,
        pages: 400,
        year: 2022,
        description: 'A gripping mystery that will keep you guessing until the very end.'
    },
    {
        id: 3,
        title: 'Love in the City',
        author: 'Emma Thompson',
        genre: 'Romance',
        rating: 4.3,
        pages: 280,
        year: 2023,
        description: 'A romantic journey through the bustling streets of a vibrant metropolis.'
    },
    {
        id: 4,
        title: 'Stars Beyond',
        author: 'Marcus Chen',
        genre: 'Sci-Fi',
        rating: 4.6,
        pages: 450,
        year: 2024,
        description: 'An epic space adventure exploring the mysteries of the universe.'
    },
    {
        id: 5,
        title: 'Dragons of Eldoria',
        author: 'Lisa Fantasia',
        genre: 'Fantasy',
        rating: 4.7,
        pages: 520,
        year: 2023,
        description: 'Enter a magical world filled with dragons, magic, and ancient prophecies.'
    },
    {
        id: 6,
        title: 'The Science of Tomorrow',
        author: 'Dr. Robert Hayes',
        genre: 'Non-Fiction',
        rating: 4.4,
        pages: 360,
        year: 2024,
        description: 'Explore cutting-edge discoveries that are shaping our future.'
    },
    {
        id: 7,
        title: 'Whispers in the Dark',
        author: 'Victoria Cross',
        genre: 'Thriller',
        rating: 4.5,
        pages: 380,
        year: 2023,
        description: 'A psychological thriller that explores the darkest corners of the human mind.'
    },
    {
        id: 8,
        title: 'The Mountain Call',
        author: 'David Wilderness',
        genre: 'Adventure',
        rating: 4.6,
        pages: 410,
        year: 2023,
        description: 'An incredible adventure story of survival and triumph in the wilderness.'
    },
    {
        id: 9,
        title: 'Heritage Secrets',
        author: 'Patricia Moore',
        genre: 'Historical Fiction',
        rating: 4.5,
        pages: 470,
        year: 2022,
        description: 'A captivating historical narrative spanning generations and continents.'
    },
    {
        id: 10,
        title: 'The Art of Living',
        author: 'Sophia Wellness',
        genre: 'Self-Help',
        rating: 4.3,
        pages: 290,
        year: 2024,
        description: 'Discover timeless principles for a meaningful and fulfilling life.'
    },
    {
        id: 11,
        title: 'Ocean\'s Embrace',
        author: 'Nicholas Wave',
        genre: 'Adventure',
        rating: 4.4,
        pages: 340,
        year: 2023,
        description: 'An epic tale of sailors, seas, and searching for treasure and truth.'
    },
    {
        id: 12,
        title: 'The Silent Patient',
        author: 'Isabella Noir',
        genre: 'Thriller',
        rating: 4.7,
        pages: 350,
        year: 2022,
        description: 'A twisted psychological thriller with an unforgettable ending.'
    }
];

const originalNovels = [
    {
        id: 101,
        title: 'The Whispers of Destiny',
        author: 'Tawananyasha Nzombe',
        genre: 'Fantasy',
        rating: 4.9,
        pages: 520,
        year: 2025,
        description: 'An enchanting original tale that explores fate, love, and the power of choice. Exclusive to InkRealm.',
        original: true
    },
    {
        id: 102,
        title: 'Between Two Worlds',
        author: 'Tawananyasha Nzombe',
        genre: 'Science Fiction',
        rating: 4.8,
        pages: 480,
        year: 2025,
        description: 'A groundbreaking sci-fi novel that challenges our understanding of reality and consciousness. Exclusive to InkRealm.',
        original: true
    },
    {
        id: 103,
        title: 'The Heart\'s Journey',
        author: 'Tawananyasha Nzombe',
        genre: 'Romance',
        rating: 4.7,
        pages: 400,
        year: 2025,
        description: 'A beautiful romance spanning cultures and continents. An original masterpiece by Tawananyasha Nzombe. Exclusive to InkRealm.',
        original: true
    },
    {
        id: 104,
        title: 'Echoes of Tomorrow',
        author: 'Tawananyasha Nzombe',
        genre: 'Thriller',
        rating: 4.8,
        pages: 420,
        year: 2025,
        description: 'A nail-biting thriller that questions morality and justice. Only available on InkRealm.',
        original: true
    },
    {
        id: 105,
        title: 'The Legacy Chronicles',
        author: 'Tawananyasha Nzombe',
        genre: 'Historical Fiction',
        rating: 4.9,
        pages: 600,
        year: 2025,
        description: 'An epic historical novel spanning centuries and civilizations. The crown jewel of InkRealm originals.',
        original: true
    }
];

const genres = [
    { name: 'Fiction', icon: 'fas fa-book', count: 12 },
    { name: 'Mystery', icon: 'fas fa-mask', count: 8 },
    { name: 'Romance', icon: 'fas fa-heart', count: 10 },
    { name: 'Sci-Fi', icon: 'fas fa-rocket', count: 15 },
    { name: 'Fantasy', icon: 'fas fa-wand-magic-sparkles', count: 18 },
    { name: 'Thriller', icon: 'fas fa-bolt', count: 9 },
    { name: 'Adventure', icon: 'fas fa-compass', count: 11 },
    { name: 'Non-Fiction', icon: 'fas fa-book', count: 14 }
];
