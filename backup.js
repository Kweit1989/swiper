

// Swiper coverflow
new Swiper(".swiper-photo-coverflow", {
    slidesPerView: 1,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 20,
      stretch: 50,
      slideShadows: true,
    },
    initialSlide: 1,
    loop: true,
    grabCursor: true,
    loopAdditionalSlides: 1, // Загружать 1 дополнительный слайд для корректного зацикливания
  });
  
  // Swiper - cube
  // Инициализация всех слайдеров на странице с индивидуальными initialSlide
  document
    .querySelectorAll(".swiper-photo-cube")
    .forEach(function (swiperElement) {
      const initialSlide =
        parseInt(swiperElement.getAttribute("data-initial-slide")) || 0; // Получаем initialSlide из data-атрибута
  
      new Swiper(swiperElement, {
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 20,
          shadowScale: 1.24,
        },
        initialSlide: initialSlide, // Устанавливаем индивидуальный initialSlide
        loop: true,
        grabCursor: true,
        slideToClickedSlide: false,
        // zoom: { // Еще нужно джобавить для контейнера картинки класс swiper-zoom-container
        //   maxRatio: 1.1,
        //   minRatio: 1,
        //   toggle: true, // Это позволяет зумить через двойной клик
        // },
      });
    });
  
  // Swiper - fade
  new Swiper(".swiper-photo-fade", {
    slidesPerView: 1,
    effect: "fade",
    speed: 1500,
    allowTouchMove: false,
    pagination: {
      el: ".photo-fade-paggination", // Указываем класс для пагинации
      clickable: true, // Пагинация кликабельная
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".photo-fade-navigation-next", // Класс кнопки "вперед"
      prevEl: ".photo-fade-navigation-prev", // Класс кнопки "назад"
    },
  });
  
  // Swiper - flip (с вертикальным progressbar)
  document
    .querySelectorAll(".swiper-photo-flip")
    .forEach(function (swiperElement, index) {
      const initialSlider =
        parseInt(swiperElement.getAttribute("data-initial-slide")) || 0;
  
      new Swiper(swiperElement, {
        initialSlide: initialSlider,
        slidesPerView: 1,
        effect: "flip",
        speed: 1500,
        grabCursor: true,
        pagination: {
          el: `.photo-flip-pagination-${index + 1}`, // Уникальный класс
          clickable: true,
          type: "progressbar",
        },
        on: {
          init: function () {
            const progressBar = document.querySelector(
              `.photo-flip-pagination-${
                index + 1
              } .swiper-pagination-progressbar-fill`
            );
            if (progressBar) {
              progressBar.style.transformOrigin = "top left";
              const progress = (initialSlider + 1) / this.slides.length;
              progressBar.style.transform = `scaleX(1) scaleY(${progress})`; // Всегда scaleX(1)
            }
          },
          slideChangeTransitionStart: function () {
            const progressBar = document.querySelector(
              `.photo-flip-pagination-${
                index + 1
              } .swiper-pagination-progressbar-fill`
            );
            if (progressBar) {
              const progress = (this.activeIndex + 1) / this.slides.length;
              progressBar.style.transform = `scaleX(1) scaleY(${progress})`; // Всегда scaleX(1)
            }
          },
        },
      });
    });
  