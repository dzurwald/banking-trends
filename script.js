// ===== Password Lock =====
const CORRECT_PASSWORD = "prirodzenenajlepsi";

function checkPassword() {
  const passEl = document.getElementById('password');
  const pass = passEl?.value?.trim() || "";

  if (pass === CORRECT_PASSWORD) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    passEl.value = "";
  } else {
    alert('Wrong password. Try again.');
    passEl.value = "";
    passEl.focus();
  }
}

// Submit on Enter in the password field
document.getElementById('password')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

// ===== Sidebar controls =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('sidebarToggle');

function openSidebar() {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
  toggleBtn?.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
  toggleBtn?.setAttribute('aria-expanded', 'false');
}

function toggleSidebar() {
  if (sidebar.classList.contains('-translate-x-full')) openSidebar();
  else closeSidebar();
}

toggleBtn?.addEventListener('click', toggleSidebar);
overlay?.addEventListener('click', closeSidebar);

// Close sidebar after clicking a link on mobile
sidebar?.querySelectorAll('a[target="content"]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 1023px)').matches) closeSidebar();
  });
});

// Optional: close on Escape (mobile)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});
