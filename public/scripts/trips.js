  document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch("/data/trips.json");
  const trips = await response.json();

  const titleEl = document.querySelector("[data-trip-title]");
  const textEl = document.querySelector("[data-trip-text]");
  const carousel = document.querySelector('[data-carousel]');
  const track = carousel.querySelector('.track');
  const grid = document.querySelector("[data-trip-grid]");
  const counterCurrent = document.querySelector("[data-current]");
  const counterTotal = document.querySelector("[data-total]");

  let index = 0;
  let currentTrip = trips[0];

function getImages(folder) {
  const maxImages = 50;
  const images = [];

  for (let i = 1; i <= maxImages; i++) {
    const num = String(i).padStart(2, "0");
    images.push(`/unterwegs/${folder}/${num}.jpg`);
  }

  return images;
}

function renderCarousel(images) {
  const track = document.querySelector(".track");

  track.innerHTML = images.map(src => `
    <div class="slide">
      <img src="${src}" loading="lazy" />
    </div>
  `).join("");

  index = 0;
  updateSlide();
}

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
    counterCurrent.textContent = index + 1;
  }

function loadTrip(trip) {
  currentTrip = trip;

  titleEl.textContent = trip.title;
  textEl.textContent = trip.text;

  const images = getImages(trip.folder);
  renderCarousel(images);
  currentTrip.images = images;
  counterTotal.textContent = images.length;

  document.querySelectorAll(".trip-card").forEach(card =>
    card.classList.toggle("active", card.dataset.slug === trip.slug)
  );

  document.querySelector("[data-carousel]")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

  // Navigation
  document.querySelector(".next").onclick = () => {
    index = (index + 1) % currentTrip.images.length;
    updateSlide();
  };

  document.querySelector(".prev").onclick = () => {
    index = (index - 1 + currentTrip.images.length) % currentTrip.images.length;
    updateSlide();
  };

  // Grid erstellen
  trips.forEach(trip => {
    const card = document.createElement("button");
    card.className = "trip-card";
    card.dataset.slug = trip.slug;

    card.innerHTML = `
      <img src="${trip.cover}" alt="">
      <span>${trip.title}</span>
    `;

    card.onclick = () => loadTrip(trip);

    grid.appendChild(card);
  });

  // Initial: erster Trip
  loadTrip(trips[0]);

});