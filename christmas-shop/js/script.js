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
    let stepCount = 0;

    function getMaxIndex() {
      const viewportWidth = document.querySelector('.slider-viewport').offsetWidth;
      const totalWidth = sliderTrack.scrollWidth;
      const itemWidth = sliderTrack.querySelector('.slider-item').offsetWidth;
      const gap = 20;
      
      // Obliczamy ile pełnych kroków (item + gap) mieści się w pozostałej przestrzeni
      return Math.round((totalWidth - viewportWidth) / (itemWidth + gap));
    }

    nextBtn.addEventListener('click', () => {
      if (currentIndex < getMaxIndex()) {
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
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const gap = 20;
      const itemWidth = items[0].offsetWidth;
      const totalOffset = currentIndex * (itemWidth + gap);

      sliderTrack.style.transform = `translateX(-${totalOffset}px)`;

      // blokada przycisków
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';

      const isEnd = currentIndex >= maxIndex;
      nextBtn.style.pointerEvents = isEnd ? 'none' : 'auto';
      nextBtn.style.opacity = isEnd ? '0.5' : '1';
    }

    // Resetuj pozycję przy zmianie rozmiaru okna
    window.addEventListener('resize', () => {
      currentIndex = 0;
      updateSlider();
    });

    // stan początkowy
    updateSlider();
  }

  // ===== Burger Menu Stage 1 (Fix) =====
  const burgerBtn = document.querySelector('.Burger');
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelectorAll('.nav-item');

  if (burgerBtn && navContainer) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      navContainer.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Zamykanie menu po kliknięciu w link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navContainer.classList.contains('active')) {
          burgerBtn.classList.remove('active');
          navContainer.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
  }

  // ===== Modal Logic =====
  const modal = document.querySelector('#gift-modal');
  const modalClose = document.querySelector('.modal-close');

  function openModal(giftData) {
    if (!modal) return;
    
    // Wypełnianie danych (przykład)
    document.querySelector('#modal-title').textContent = giftData.name;
    document.querySelector('#modal-description').textContent = giftData.description;
    document.querySelector('#modal-tag').textContent = giftData.category;
    // Tutaj dodasz logikę dla supermocy (gwiazdki/skala)

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // Delegacja zdarzeń dla kart prezentów (obsłuży też te dodane dynamicznie)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gift-card');
    if (card) {
      // Na razie symulujemy dane, docelowo pobierzemy je z załadowanego JSONa
      const mockData = {
        name: card.querySelector('.header-3').textContent,
        description: "Wonderful holiday gift description...",
        category: card.querySelector('.gift-tag').textContent
      };
      openModal(mockData);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Zamknij po kliknięciu w overlay
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
