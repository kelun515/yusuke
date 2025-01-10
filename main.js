const carousel = document.getElementById('productCarousel');
const productContainers = document.querySelectorAll('.product-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const mainImage = document.getElementById('mainImage');


// Function to switch products
function switchProduct(containerId) {
  productContainers.forEach(container => {
    if (container.id === containerId) {
      container.style.display = 'flex';
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.opacity = '1';
      }, 50);
    } else {
      container.style.display = 'none';
    }
  });
}

// Function to update main image
function updateMainImage(src) {
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = src.replace('100x100', '400x400');
    mainImage.style.opacity = '1';
  }, 300);
}

// Add click event listeners to carousel items
document.addEventListener('DOMContentLoaded', () => {
  carouselItems.forEach(item => {
    item.addEventListener('click', () => {
      carouselItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const containerId = item.getAttribute('data-container-id');
      switchProduct(containerId);
      updateMainImage(item.src);
    });
  });

  // Update main image on page load
  window.addEventListener('popstate', () => {
    const activeCarouselItem = document.querySelector('.carousel-item.active');
    if (activeCarouselItem) {
      updateMainImage(activeCarouselItem.src);
    }
  });
 
});

// Add horizontal scroll with mouse wheel
carousel.addEventListener('wheel', (e) => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});

// Add drag to scroll functionality
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  carousel.style.cursor = 'grabbing';
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
  carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
  carousel.style.cursor = 'grab';
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchend', () => {
  isDown = false;
});

carousel.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    switchProduct(null, category);
  });
});


// Improve image loading performance
function preloadImages() {
  const images = document.querySelectorAll('.carousel-item');
  images.forEach(img => {
    const fullSizeImg = new Image();
    fullSizeImg.src = img.src.replace('100x100', '500x500');
  });
}


document.addEventListener('DOMContentLoaded', preloadImages);

// Fix for iOS Safari 100vh issue
function fixIOSViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', fixIOSViewportHeight);
fixIOSViewportHeight();

// Initialize the first product as visible
switchProduct('hoodie1', 'hoodie');


console.log('Product switcher initialized');


