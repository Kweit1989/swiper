const correctPassword = "12345"; // Замените на ваш пароль

let swiperInstances = []; // Массив для хранения экземпляров Swiper

function checkPassword() {
  const enteredPassword = document.getElementById("password").value;

  if (enteredPassword === correctPassword) {
    // Скрываем форму пароля и показываем контент
    document.getElementById("passwordForm").style.display = "none";
    document.getElementById("content").style.display = "flex";

    // Отложенная инициализация Swiper
    initializeSwipers();
  } else {
    alert("Неверный пароль");
  }
}

// Добавляем обработчик события keydown для поля ввода пароля
document
  .getElementById("password")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Проверяем, что нажата клавиша Enter
      checkPassword(); // Вызываем функцию проверки пароля
    }
  });

// Пример функции для инициализации Swiper
function initializeSwipers() {
  // Ваш код для инициализации Swiper
}

function initializeSwipers() {
  swiperInstances.forEach((swiper) => swiper.destroy(true, true)); // Удаляем старые экземпляры
  swiperInstances = []; // Очищаем массив

  // Swiper coverflow
  swiperInstances.push(
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
      loopAdditionalSlides: 1,
    })
  );

  // Swiper - cube
  document.querySelectorAll(".swiper-photo-cube").forEach((swiperElement) => {
    const initialSlide =
      parseInt(swiperElement.getAttribute("data-initial-slide")) || 0;
    const swiper = new Swiper(swiperElement, {
      effect: "cube",
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 1.24,
      },
      initialSlide: initialSlide,
      loop: true,
      grabCursor: true,
    });
    swiperInstances.push(swiper);
  });

  // Swiper - fade
  swiperInstances.push(
    new Swiper(".swiper-photo-fade", {
      slidesPerView: 1,
      effect: "fade",
      speed: 1500,
      allowTouchMove: false,
      pagination: {
        el: ".photo-fade-paggination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".photo-fade-navigation-next",
        prevEl: ".photo-fade-navigation-prev",
      },
    })
  );

  // Swiper - flip
  document
    .querySelectorAll(".swiper-photo-flip")
    .forEach((swiperElement, index) => {
      const initialSlider =
        parseInt(swiperElement.getAttribute("data-initial-slide")) || 0;
      const swiper = new Swiper(swiperElement, {
        initialSlide: initialSlider,
        slidesPerView: 1,
        effect: "flip",
        speed: 1500,
        grabCursor: true,
        pagination: {
          el: `.photo-flip-pagination-${index + 1}`,
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
      swiperInstances.push(swiper);
    });
}
