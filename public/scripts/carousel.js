document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.track');
    const slides = [...carousel.querySelectorAll('.slide')];
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const counter = carousel.querySelector('[data-current]');
    let index = 0;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      counter.textContent = index + 1;
    }

    next?.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      update();
    });

    prev?.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });

    update();
  });
});

// LIGHTBOX
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');

document.querySelectorAll('.slide img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = e => {
  if (e.target === lightbox) closeLightbox();
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});