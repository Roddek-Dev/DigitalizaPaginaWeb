function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length > instance) {
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");
const link5 = document.getElementById("link5");
const link6 = document.getElementById("link6");

link1.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".header");
});

link2.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".header", 1);
});

link3.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".footer");
});

link4.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".header");
});

link5.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".header", 1);
});

link6.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToElement(".header");
});

// PARTICULAS

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
        size_min:0.3,
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
})

// Crear el IntersectionObserver con opciones para mayor flexibilidad
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Añadir la clase 'show' cuando el elemento es visible
      entry.target.classList.add('show');
      // Deja de observar el elemento una vez que la animación se ha activado
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 // Cambiar el umbral a 10% para mejorar la precisión en las transiciones
});

// Seleccionar todos los elementos con la clase 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
  observer.observe(el);
});
