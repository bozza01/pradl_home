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
// LIGHTBOX (robust & crash-sicher)
const lightbox = document.querySelector('[data-lightbox]');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  document.addEventListener('click', e => {
    if (e.target.matches('.slide img')) {
      lightboxImg.src = e.target.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}