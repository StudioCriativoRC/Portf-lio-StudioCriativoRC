// Atualiza ano no footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll suave para links internos (fallback para navegadores que não suportam CSS smooth)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Validação básica do formulário
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }
    alert('Mensagem enviada com sucesso!');
    form.reset();
  });
}

// Animação on scroll (Intersection Observer)
const reveals = document.querySelectorAll('.reveal');
if (reveals.length !== 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// Mostrar projetos extras
const showBtn = document.getElementById('showProjects');
if (showBtn) {
  const extraProjects = document.querySelectorAll('.extra-project');

  showBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Verifica estado atual a partir do atributo data-expanded (true / false)
    const expanded = showBtn.getAttribute('data-expanded') === 'true';

    if (!expanded) {
      // Mostrar projetos adicionais
      extraProjects.forEach((card) => {
        card.style.display = 'block';
        card.classList.add('active'); // garante visibilidade imediata
      });

      showBtn.textContent = 'VER MENOS PROJETOS';
      showBtn.setAttribute('data-expanded', 'true');
    } else {
      // Ocultar projetos adicionais
      extraProjects.forEach((card) => {
        card.style.display = 'none';
      });

      showBtn.textContent = 'VER TODOS OS PROJETOS';
      showBtn.setAttribute('data-expanded', 'false');
      
      // Rolagem suave de volta ao início da seção para melhor UX
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// Menu mobile (hambúrguer)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
  });

  // Fechar menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
} 