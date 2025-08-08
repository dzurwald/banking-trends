// Keep your existing checkPassword() if you already have it.
// This just toggles login/app visibility.
function checkPassword() {
  const pass = document.getElementById('password').value;
  // TODO: replace with your real check
  if (pass && pass.length > 0) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  } else {
    alert('Enter a password');
  }
}

// Sidebar controls
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
sidebar.querySelectorAll('a[target="content"]').forEach(a => {
  a.addEventListener('click', () => {
    // Only auto-close on small screens
    if (window.matchMedia('(max-width: 1023px)').matches) closeSidebar();
  });
});

// Optional: close on Escape (mobile)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});
