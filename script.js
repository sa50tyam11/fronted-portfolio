

(function () {
  // helpers
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  // mobile nav toggle
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  menuBtn?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });


  // smooth nav links
  qa('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 28;
      window.scrollTo({ top, behavior: 'smooth' });
      // collapse nav on mobile
      if (window.innerWidth <= 720) nav.classList.remove('open');
    });
  });

  // fade-in on scroll (IntersectionObserver)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));


  // back-to-top
  const back = q('#backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) back.classList.add('show');
    else back.classList.remove('show');
  });
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 🔴 Replace with your actual EmailJS keys
  const EMAILJS_PUBLIC_KEY = "LbR8q-iqH8hGty18c";
  const EMAILJS_SERVICE_ID = "service_5z1q6pf";
  const EMAILJS_TEMPLATE_ID = "template_x8xbxwq";

  // Initialize EmailJS
  (function () {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  })();

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("sendBtn");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 🚫 stop page reload

      // UI feedback
      button.disabled = true;
      button.textContent = "Sending...";
      status.textContent = "";

      emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        this
      ).then(
        () => {
          status.textContent = "Message sent successfully ✔";
          status.style.color = "#6dff9c";
          form.reset();
        },
        (error) => {
          status.textContent = "Failed to send. Please try again.";
          status.style.color = "#ff6d6d";
          console.error("EmailJS Error:", error);
        }
      ).finally(() => {
        button.disabled = false;
        button.textContent = "Send message";
      });
    });
  });


  // set year
  const yearEl = q('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // small progressive reveal for cards if not reduced motion
  if (!prefersReduced) {
    qa('.cs-card, .mini-card').forEach((el, i) => {
      el.style.opacity = 0;
      setTimeout(() => el.style.opacity = 1, 120 * i);
    });
  }
})();
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;

  const scrolled = window.scrollY;
  heroBg.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
});


// snitch type intro 
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  // If intro doesn't exist, exit immediately
  if (!intro) return;

  // If intro already played in this session, remove immediately
  if (sessionStorage.getItem("introPlayed") === "true") {
    intro.remove();
    return;
  }

  // Mark as played
  sessionStorage.setItem("introPlayed", "true");

  // Slow write already running via CSS (1.2s)
  setTimeout(() => {
    intro.classList.add("hide");

    setTimeout(() => {
      intro.remove();
    }, 200);
  }, 1400);
});
if (document.body.dataset.page === "internal") {
  const intro = document.getElementById("intro");
  if (intro) intro.remove();
}


// cenematic animation 
const hero = document.querySelector(".hero");
const cinematicTarget = document.querySelector(".cinematic-target");

const cinematicObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hero.classList.add("cinematic-out");
        cinematicTarget.classList.add("cinematic-in");
        cinematicObserver.disconnect(); // run once
      }
    });
  },
  { threshold: 0.2 }
);

if (cinematicTarget) {
  cinematicObserver.observe(cinematicTarget);
}


// mobile nav 

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "12px";
  }
});
