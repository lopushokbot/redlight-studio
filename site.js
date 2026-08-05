// Red Light — shared page behaviour
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');
if (burger && navMobile) {
  burger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  });
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Booking form → FormSubmit (AJAX)
const form = document.getElementById('bookingForm');
if (form) {
  const status = document.getElementById('formMsg');
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const submitLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Отправляем…';
    status.className = 'form-msg';
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch('https://formsubmit.co/ajax/simon.sivakov@icloud.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
          _subject: 'Заявка с сайта Red Light',
          _template: 'table',
          'Имя': data.name,
          'Телефон': data.phone,
          'Тренировка': data.slot || '—',
          'Комментарий': data.comment || '—',
          _honey: data._honey || ''
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      status.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
      status.classList.add('is-ok');
    } catch (err) {
      status.textContent = 'Не получилось отправить. Напишите нам в Telegram — @redlightmsk.';
    } finally {
      btn.disabled = false;
      btn.textContent = submitLabel;
    }
  });
}
