// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

function updateCarousel() {
  document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}, 5000);

// Order Modal
const orderButtons = document.querySelectorAll('.order-btn');
const modal = document.getElementById('orderModal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
let currentProduct = null;

orderButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentProduct = {
      name: btn.closest('.product-card')?.dataset.name || btn.dataset.name,
      price: btn.closest('.product-card')?.dataset.price || btn.dataset.price
    };
    modalTitle.textContent = `Order: ${currentProduct.name}`;
    modalPrice.textContent = `KES ${currentProduct.price}`;
    modal.style.display = 'block';
  });
});

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

document.getElementById('confirmOrder').addEventListener('click', () => {
  const delivery = document.querySelector('input[name="delivery"]:checked');
  if (!delivery) {
    alert('Please select a delivery option.');
    return;
  }
  alert(`Order confirmed for ${currentProduct.name} (KES ${currentProduct.price}) via ${delivery.value}!`);
  modal.style.display = 'none';
});