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

  next.onclick = () => {
    index = (index + 1) % slides.length;
    update();
  };

  prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };
});