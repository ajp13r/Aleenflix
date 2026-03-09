const shows = [
  { title: "Fentyyy", year: 2024, match: "97%", rating: "TV-MA", genre: "Thriller", img: "img/IMG_3638.jpg" },
  { title: "Side Eye of Doom", year: 2025, match: "94%", rating: "TV-14", genre: "Drama", img: "img/IMG_7989.JPG" },
  { title: "Sesame Block", year: 2024, match: "91%", rating: "TV-MA", genre: "Sci-Fi", img: "img/File_001.png" },
  { title: "Eat Eat Eat", year: 2025, match: "89%", rating: "TV-14", genre: "Mystery", img: "img/File_008.png" },
  { title: "Aura Farming or Just Drunk?", year: 2025, match: "95%", rating: "TV-MA", genre: "Action", img: "img/IMG_1503.jpg" },
  { title: "The Giraffe", year: 2024, match: "88%", rating: "TV-MA", genre: "Horror", img: "img/IMG_0852.JPG" },
  { title: "MR. CLEAN!?", year: 2025, match: "93%", rating: "TV-14", genre: "Romance", img: "img/IMG_4057.jpg" },
  { title: "Munchy Run", year: 2025, match: "96%", rating: "TV-MA", genre: "Sci-Fi", img: "img/File_000.png" },
  { title: "Canadian", year: 2025, match: "90%", rating: "TV-14", genre: "Crime", img: "img/IMG_0450.jpg" },
  { title: "Six Flags", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/g1.png" },
  { title: "Dickhead", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/File_003.png" },
  { title: "Global Citizen", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/IMG_3173.jpg" },
  { title: "Halloween Partay", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/3.png" },
  { title: "Plotting", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/4.png" },
  { title: "Pokemoner", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/5.png" },
  { title: "Awkward", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/6.png" },
  { title: "They/Them?", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/9.jpg" },
  { title: "They/Them Part 2", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/10.jpg" },
  { title: "Fam", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/12.jpg" },
  { title: "Mirror Mirror on The Wall", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/16.jpg" },
  { title: "Buzzy", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/21.jpg" },
  { title: "The Thunker", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/22.jpg" },
  { title: "Flashback", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/23.jpg" },
  { title: "Madam Lori", year: 2025, match: "92%", rating: "TV-MA", genre: "Drama", img: "img/l2.png" },
];

const wideImgs = [
  { title: "Big Dubs",   match: "100%", genre: "Winners",      img: "img/8.jpg" },
  { title: "RAH",        match: "94%",  genre: "Drama",        img: "img/14.jpg" },
  { title: "Goner",      match: "91%",  genre: "Comedy",       img: "img/31.JPG" },
  { title: "Good Times", match: "95%",  genre: "Slice of Life",img: "img/l1.png" },
  { title: "Conjurer",   match: "88%",  genre: "Horror",       img: "img/p1.JPG" },
  { title: "The Brits",  match: "93%",  genre: "Action",       img: "img/p3.JPG" },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function card(show) {
  return `
    <div class="card">
      <img src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="card-overlay">
        <div class="card-title">${show.title}</div>
        <div class="card-info">
          <span class="card-match">${show.match}</span>
          <span>${show.year}</span>
          <span>${show.rating}</span>
        </div>
        <div class="card-actions">
          <button class="card-btn play-btn" title="Play">▶</button>
          <button class="card-btn" title="Add to My List">+</button>
          <button class="card-btn" title="Like">👍</button>
        </div>
      </div>
    </div>`;
}

function wideCard(w) {
  return `
    <div class="wide-card">
      <img src="${w.img}" alt="${w.title}" loading="lazy" />
      <div class="wide-card-info">
        <div class="card-title">${w.title}</div>
        <div class="card-info"><span class="card-match">${w.match}</span><span>${w.genre}</span></div>
      </div>
    </div>`;
}

function top10Card(num, show) {
  return `
    <div class="top10-card">
      <div class="top10-num">${num}</div>
      <div class="top10-img"><img src="${show.img}" alt="${show.title}" loading="lazy" /></div>
    </div>`;
}

function populate(selector, items, type = 'card') {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = items.map((s, i) => {
    if (type === 'top10') return top10Card(i + 1, s);
    if (type === 'wide') return wideCard(wideImgs[i % wideImgs.length]);
    return card(s);
  }).join('');
}

// ── Populate rows ─────────────────────────────────────────────────────────
const s = shuffle(shows);
populate('#home .row',       s.slice(0, 8));
populate('#home .top10-row', s.slice(8, 16), 'top10');
populate('#home .wide-row',  s.slice(16, 22), 'wide');
populate('#home .row2',      shuffle(shows).slice(0, 24));

populate('#tvshows .tv-row1', shuffle(shows).slice(0, 12));
populate('#tvshows .tv-row2', shuffle(shows).slice(12, 24));

populate('#movies .movies-row1', shuffle(shows).slice(0, 12));
populate('#movies .movies-row2', shuffle(shows).slice(12, 24));

populate('#new .new-row1', shuffle(shows).slice(0, 8));
populate('#new .new-row2', shuffle(shows).slice(8, 16));
populate('#new .new-row3', shuffle(shows).slice(16, 24));

// My List grid
const mylistEl = document.querySelector('.mylist-grid');
shuffle(shows).slice(0, 9).forEach(show => {
  const div = document.createElement('div');
  div.className = 'card';
  div.style.flex = 'unset';
  div.innerHTML = `<img src="${show.img}" alt="${show.title}" style="width:100%;aspect-ratio:2/3;object-fit:cover;" /><div class="card-overlay"><div class="card-title">${show.title}</div></div>`;
  mylistEl.appendChild(div);
});

// Trending row for search
populate('#searchPage .trending-row', shuffle(shows).slice(0, 8));

// ── Navigation ────────────────────────────────────────────────────────────
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a');

function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === id));
  window.scrollTo({ top: 0 });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Search toggle
document.getElementById('searchToggle').addEventListener('click', () => {
  showPage('searchPage');
  setTimeout(() => document.getElementById('searchInput')?.focus(), 50);
});

// Genre pills toggle
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.closest('.genre-pills').querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger toggle
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});