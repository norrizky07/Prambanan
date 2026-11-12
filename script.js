
const gallery = document.getElementById('gallery');
const items = [...document.querySelectorAll('.gallery-item')];

const lightbox = document.getElementById('lightbox');
const closeButton = document.getElementById('close-lightbox');

let selected = 0;
let lastFocused = null;

/** @param {number} index */
function selectPhoto(index) {
  selected = index;

  items.forEach((item, i) => {
    item.classList.toggle('is-active', i === index);
    item.setAttribute('aria-pressed', String(i === index));
  });
}

/** @param {number} index */
function openPhoto(index) {
  selectPhoto(index);

  const source = items[index].querySelector('img');
  const caption = items[index].querySelector('span');

  const large = document.getElementById('lightbox-image');

  large.src = source.currentSrc || source.src;
  large.alt = source.alt;

  document.getElementById('lightbox-caption').textContent =
    caption.textContent;

  lastFocused = document.activeElement;

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');

  closeButton.focus();
}

function closePhoto() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');

  document.getElementById('lightbox-image').removeAttribute('src');

  if (lastFocused) {
    lastFocused.focus();
  }
}

// Membuka foto ketika diklik
items.forEach((item, index) => {
  item.addEventListener('click', () => openPhoto(index));
});

// Tombol Jelajahi
document.getElementById('explore-button')
  .addEventListener('click', () => {
    gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });

    items[0].focus();
  });

// Tombol foto berikutnya
document.getElementById('next-photo')
  .addEventListener('click', () => {
    const next = (selected + 1) % items.length;

    selectPhoto(next);

    items[next].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });

    items[next].focus();
  });

// Tombol tutup
closeButton.addEventListener('click', closePhoto);

// Menutup ketika area luar foto diklik
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

// Menutup dengan tombol Escape
document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    lightbox.classList.contains('is-open')
  ) {
    closePhoto();
  }
});
