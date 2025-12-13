

(function(){
  // helpers
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  // mobile nav toggle
  const menuBtn = q('#menuBtn');
  const nav = q('#nav');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // smooth nav links
  qa('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if(!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if(!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 28;
      window.scrollTo({top, behavior: 'smooth'});
      // collapse nav on mobile
      if(window.innerWidth <= 720) nav.classList.remove('open');
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
    if(window.scrollY > 400) back.classList.add('show');
    else back.classList.remove('show');
  });
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // contact form mailto (quick)
  const form = q('#contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.querySelector('[name=name]')||{}).value.trim();
      const email = (form.querySelector('[name=email]')||{}).value.trim();
      const project = (form.querySelector('[name=project]')||{}).value.trim();
      const message = (form.querySelector('[name=message]')||{}).value.trim();
      if(!name || !email || !project){
        alert('Please include name, email and a short project title.');
        return;
      }
      const subj = encodeURIComponent(`${project} — Brief from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:krjhasatyam128@gmail.com?subject=${subj}&body=${body}`;
    });
  }

  // set year
  const yearEl = q('#year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // small progressive reveal for cards if not reduced motion
  if(!prefersReduced){
    qa('.cs-card, .mini-card').forEach((el,i) => {
      el.style.opacity = 0;
      setTimeout(()=> el.style.opacity = 1, 120 * i);
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

// email.js 
(function () {
  emailjs.init("LbR8q-iqH8hGty18c"); 
})();

const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusMsg.textContent = "Sending...";
  statusMsg.style.opacity = "0.8";

  emailjs
    .sendForm(
      "service_dkjtpaf",   
      "template_x8xbxwq",  
      this
    )
    .then(
      () => {
        statusMsg.textContent = "Message sent successfully.";
        statusMsg.style.color = "#9effc2";
        form.reset();
      },
      (error) => {
        statusMsg.textContent = "Failed to send message. Please try again.";
        statusMsg.style.color = "#ff9e9e";
        console.error("EmailJS error:", error);
      }
    );
});
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


