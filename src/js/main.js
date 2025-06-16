// Función de desplazamiento suave refactorizada
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// PARTICULAS (sin cambios)
particlesJS("background", {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 300,
      },
    },
    color: {
      value: "#028a0f",
    },
    shape: {
      type: "triangle",
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#028a0f",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  retina_detect: true,
});

// IntersectionObserver para animaciones (sin cambios)
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => {
  observer.observe(el);
});

// Carrusel simple de imágenes (sin cambios)
const imagenes = document.querySelectorAll(".testimonio-img");
const puntos = document.querySelectorAll(".punto");
const btnPrev = document.querySelector(".control-btn:first-child");
const btnNext = document.querySelector(".control-btn:last-child");
let currentIndex = 0;

function showImage(index) {
  imagenes.forEach((img) => img.classList.remove("active"));
  puntos.forEach((punto) => punto.classList.remove("activo"));

  imagenes[index].classList.add("active");
  puntos[index].classList.add("activo");
}

btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imagenes.length;
  showImage(currentIndex);
});

btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
  showImage(currentIndex);
});

puntos.forEach((punto, index) => {
  punto.addEventListener("click", () => {
    currentIndex = index;
    showImage(currentIndex);
  });
});

let intervalo = setInterval(() => {
  currentIndex = (currentIndex + 1) % imagenes.length;
  showImage(currentIndex);
}, 5000);

const carrusel = document.querySelector(".testimonios-carrusel");
carrusel.addEventListener("mouseenter", () => clearInterval(intervalo));
carrusel.addEventListener("mouseleave", () => {
  intervalo = setInterval(() => {
    currentIndex = (currentIndex + 1) % imagenes.length;
    showImage(currentIndex);
  }, 5000);
});

showImage(0);

// Carrusel de Marcas (sin cambios)
const marcaCarrusel = document.querySelector(".marcas-carrusel");
const marcaContainer = document.querySelector(".marcas-container-inner");
const marcaItems = document.querySelectorAll(".marca-item");
const marcaPuntos = document.querySelectorAll(".marcas-puntos .punto");
const prevBtn = document.querySelector(".marca-control.prev");
const nextBtn = document.querySelector(".marca-control.next");

const config = {
  itemsToShow: () => {
    if (window.innerWidth < 600) return 2;
    if (window.innerWidth < 900) return 3;
    return 4;
  },
  transitionDuration: 800,
  autoPlayInterval: 2500,
};

let currentMarca = 0;
let isTransitioning = false;
let itemsVisible = config.itemsToShow();

function initMarcas() {
  updateMarcaContainerWidth();
  updateMarcasVisibility();

  let marcaInterval = setInterval(nextMarca, config.autoPlayInterval);

  marcaCarrusel.addEventListener("mouseenter", () => clearInterval(marcaInterval));
  marcaCarrusel.addEventListener("mouseleave", () => {
    marcaInterval = setInterval(nextMarca, config.autoPlayInterval);
  });

  window.addEventListener("resize", () => {
    const newItemsVisible = config.itemsToShow();
    if (newItemsVisible !== itemsVisible) {
      itemsVisible = newItemsVisible;
      updateMarcaContainerWidth();
      updateMarcasVisibility();
    }
  });
}

function updateMarcaContainerWidth() {
  const itemWidth = 100 / itemsVisible;
  marcaItems.forEach((item) => {
    item.style.flex = `0 0 ${itemWidth}%`;
    item.style.maxWidth = `${itemWidth}%`;
  });
}

function updateMarcasVisibility() {
  marcaItems.forEach((item, index) => {
    item.classList.remove("active", "next", "prev");

    for (let i = 0; i < itemsVisible; i++) {
      const visibleIndex = (currentMarca + i) % marcaItems.length;
      if (index === visibleIndex) {
        item.classList.add("active");
      }
    }

    const nextIndex = (currentMarca + itemsVisible) % marcaItems.length;
    if (index === nextIndex) {
      item.classList.add("next");
    }

    const prevIndex = (currentMarca - 1 + marcaItems.length) % marcaItems.length;
    if (index === prevIndex) {
      item.classList.add("prev");
    }
  });

  updatePuntos();
}

function nextMarca() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentMarca = (currentMarca + 1) % marcaItems.length;

  marcaContainer.style.transition = `transform ${config.transitionDuration}ms ease`;
  marcaContainer.style.transform = `translateX(-${
    (currentMarca * 100) / itemsVisible
  }%)`;

  setTimeout(() => {
    marcaContainer.style.transition = "none";
    if (currentMarca >= marcaItems.length - itemsVisible) {
      currentMarca = 0;
      marcaContainer.style.transform = "translateX(0)";
    }
    updateMarcasVisibility();
    isTransitioning = false;
  }, config.transitionDuration);
}

function prevMarca() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentMarca = (currentMarca - 1 + marcaItems.length) % marcaItems.length;

  if (currentMarca === marcaItems.length - 1) {
    marcaContainer.style.transition = "none";
    marcaContainer.style.transform = `translateX(-${
      ((marcaItems.length - itemsVisible) * 100) / itemsVisible
    }%)`;
    void marcaContainer.offsetWidth;
  }

  marcaContainer.style.transition = `transform ${config.transitionDuration}ms ease`;
  marcaContainer.style.transform = `translateX(-${
    (currentMarca * 100) / itemsVisible
  }%)`;

  setTimeout(() => {
    updateMarcasVisibility();
    isTransitioning = false;
  }, config.transitionDuration);
}

function updatePuntos() {
  marcaPuntos.forEach((punto, index) => {
    punto.classList.remove("activo");
    if (index === currentMarca) {
      punto.classList.add("activo");
    }
  });
}

nextBtn.addEventListener("click", nextMarca);
prevBtn.addEventListener("click", prevMarca);

marcaPuntos.forEach((punto, index) => {
  punto.addEventListener("click", () => {
    if (index !== currentMarca && !isTransitioning) {
      currentMarca = index;
      updateMarcasVisibility();
    }
  });
});

initMarcas();