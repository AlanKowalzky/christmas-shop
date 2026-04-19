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
  // Ta sekcja zostanie wywołana wewnątrz loadAllGifts, aby obsłużyć dynamiczne karty
  function setupFiltering(giftCards) {
  const tabs = document.querySelectorAll('.tab');

    if (tabs.length > 0) {
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
  }

  // ===== Countdown Timer (CTA section) =====
  const countdownNumbers = document.querySelectorAll('.countdown-number');
  if (countdownNumbers.length > 0) {
    function updateCountdown() {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      if (now > christmas) {
        christmas.setFullYear(now.getFullYear() + 1);
      }
      const diff = christmas - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const numbers = document.querySelectorAll('.countdown-number');

      if (numbers.length >= 4) {
        numbers[0].textContent = days;
        numbers[1].textContent = hours;
        numbers[2].textContent = minutes;
        numbers[3].textContent = seconds;
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
  const navLinks = document.querySelectorAll('.nav-link-text'); // Celujemy w tekst/linki wewnątrz

  if (burgerBtn && navContainer) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('active');
      navContainer.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Zamykanie menu po kliknięciu w link (obsługa nawigacji między stronami)
    navLinks.forEach(link => {
      const parentLink = link.closest('.nav-item');
      parentLink.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Resetuj stan menu przy zmianie szerokości okna powyżej 768px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        burgerBtn.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  let giftsData = []; // Globalne przechowywanie danych o prezentach

  // ===== Fetch and Display Best Gifts =====
  async function loadBestGifts() {
    const grid = document.querySelector('.best-gifts .gifts-grid');
    if (!grid) return;

    try {
      const response = await fetch('gifts.json');
      giftsData = await response.json();

      // Pobieramy pierwsze 4 prezenty zgodnie z kolejnością w designie
      const selected = giftsData.slice(0, 4);

      grid.innerHTML = ''; // Czyścimy statyczny HTML

      selected.forEach(gift => {
        const categoryClass = gift.category.toLowerCase().replace('for ', '');
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.dataset.name = gift.name; // Ułatwia znalezienie danych dla modala
        card.tabIndex = 0;
        card.innerHTML = `
          <div class="gift-card-image">
            <img src="assets/images/gift-for-${categoryClass}.png" alt="${gift.name}">
          </div>
          <div class="gift-card-content">
            <span class="gift-tag header-4" data-tag="${categoryClass}">${gift.category}</span>
            <p class="header-3">${gift.name}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading gifts:', error);
    }
  }

  // Wywołanie ładowania prezentów
  loadBestGifts();

  // ===== Fetch and Display All Gifts (Gifts Page) =====
  async function loadAllGifts() {
    const grid = document.querySelector('.gifts-page-grid');
    if (!grid) return;

    try {
      const response = await fetch('gifts.json');
      giftsData = await response.json();

      grid.innerHTML = '';

      giftsData.forEach(gift => {
        const categoryClass = gift.category.toLowerCase().replace('for ', '');
        const card = document.createElement('div');
        card.className = 'gift-card';
        card.dataset.category = categoryClass;
        card.innerHTML = `
          <div class="gift-card-image">
            <img src="assets/images/gift-for-${categoryClass}.png" alt="${gift.name}">
          </div>
          <div class="gift-card-content">
            <span class="gift-tag header-4" data-tag="${categoryClass}">${gift.category}</span>
            <p class="header-3">${gift.name}</p>
          </div>
        `;
        grid.appendChild(card);
      });

      const giftCards = document.querySelectorAll('.gift-card');
      setupFiltering(giftCards);
    } catch (error) {
      console.error('Error loading all gifts:', error);
    }
  }

  loadAllGifts();

  // ===== Modal Logic =====
  const modal = document.querySelector('#gift-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalImg = document.querySelector('#modal-img');

  function openModal(giftData) {
    if (!modal) return;
    
    const categoryClass = giftData.category.toLowerCase().replace('for ', '');
    if (modalImg) {
      modalImg.src = `assets/images/gift-for-${categoryClass}.png`;
      modalImg.alt = giftData.name;
    }

    const modalTitle = document.querySelector('#modal-title');
    const modalDesc = document.querySelector('#modal-description');
    const modalTag = document.querySelector('#modal-tag');
    if (modalTitle) modalTitle.textContent = giftData.name;
    if (modalDesc) modalDesc.textContent = giftData.description;
    if (modalTag) modalTag.textContent = giftData.category;
    
    const powersContainer = document.querySelector('#modal-powers');
    if (powersContainer) {
      let powersHTML = '';

    Object.entries(giftData.superpowers).forEach(([power, value]) => {
      const filledStars = Math.floor(parseInt(value) / 100);
      const starsSVG = Array(5).fill(0).map((_, i) => `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="${i < filledStars ? '#FF4646' : '#FF46461A'}">
          <path d="M8 0L9.5 5.5H15L10.5 8.5L12 14L8 11L4 14L5.5 8.5L1 5.5H6.5L8 0Z" />
        </svg>`).join('');

      powersHTML += `
        <div class="power-item">
          <span class="header-4">${power.toUpperCase()}</span>
          <span class="paragraph">${value}</span>
          <div class="power-icons">${starsSVG}</div>
        </div>`;
    });
    powersContainer.innerHTML = powersHTML;

    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // Obsługa klawisza Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gift-card');
    if (card) {
      // Szukanie po nazwie lub dataset (bezpieczniejsze)
      const giftName = card.querySelector('.header-3').textContent.trim();
      const giftData = giftsData.find(g => g.name === giftName);
      if (giftData) openModal(giftData);
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
