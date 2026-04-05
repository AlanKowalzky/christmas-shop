/* ===== Christmas Shop - JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Explore Buttons (navigate to Gifts page) =====
  document.querySelectorAll('.btn-explore').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'gifts.html';
    });
  });

  // ===== Tab Filtering (Gifts page) =====
  const tabs = document.querySelectorAll('.tab');
  const giftCards = document.querySelectorAll('.gifts-page-grid .gift-card');

  if (tabs.length > 0 && giftCards.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('active')) return;

        // Remove active from all tabs
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;

        giftCards.forEach((card) => {
          if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ===== Countdown Timer (CTA section) =====
  const countdownNumber = document.querySelector('.countdown-number');
  if (countdownNumber) {
    function updateCountdown() {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      const diff = christmas - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const numbers = document.querySelectorAll('.countdown-number');

      if (numbers.length >= 4) {
        numbers[0].textContent = String(days).padStart(2, '0');
        numbers[1].textContent = String(hours).padStart(2, '0');
        numbers[2].textContent = String(minutes).padStart(2, '0');
        numbers[3].textContent = String(seconds).padStart(2, '0');
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ===== Slider Controls =====
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const sliderTrack = document.querySelector('.slider-track');

  if (prevBtn && nextBtn && sliderTrack) {
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
      const items = sliderTrack.querySelectorAll('.slider-item');
      if (currentIndex < items.length - 3) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    function updateSlider() {
      const items = sliderTrack.querySelectorAll('.slider-item');
      if (currentIndex < 0) currentIndex = 0;

      let totalOffset = 0;
      const gap = 20;

      for (let i = 0; i < currentIndex; i++) {
        totalOffset += items[i].offsetWidth + gap;
      }

      sliderTrack.style.transform = `translateX(-${totalOffset}px)`;

      // blokada przycisków
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';

      const isEnd = currentIndex >= items.length - 3;
      nextBtn.style.pointerEvents = isEnd ? 'none' : 'auto';
      nextBtn.style.opacity = isEnd ? '0.5' : '1';
    }

    // stan początkowy
    updateSlider();
  }
});
