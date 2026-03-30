const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

for (const element of document.querySelectorAll('.reveal')) {
  observer.observe(element);
}

const marquee = document.querySelector('.tools-marquee');

let isDown = false;
let startX;
let scrollLeft;

marquee.addEventListener('mousedown', (e) => {
  isDown = true;
  marquee.style.cursor = 'grabbing';
  startX = e.pageX - marquee.offsetLeft;
  scrollLeft = marquee.scrollLeft;
});

marquee.addEventListener('mouseleave', () => {
  isDown = false;
  marquee.style.cursor = 'grab';
});

marquee.addEventListener('mouseup', () => {
  isDown = false;
  marquee.style.cursor = 'grab';
});

marquee.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - marquee.offsetLeft;
  const walk = (x - startX) * 2;
  marquee.scrollLeft = scrollLeft - walk;
});