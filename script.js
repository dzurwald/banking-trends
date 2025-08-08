// ===== Password Lock =====
const CORRECT_PASSWORD = "prirodzenenajlepsi";
const LS_KEY = "bt_unlocked";

function enforceLock() {
  const unlocked = localStorage.getItem(LS_KEY) === "1";
  const login = document.getElementById("login");
  const app = document.getElementById("app");

  if (unlocked) {
    login.classList.add("hidden");
    app.classList.remove("hidden");
  } else {
    app.classList.add("hidden");
    login.classList.remove("hidden");
  }
}

function checkPassword(e) {
  if (e) e.preventDefault();

  const passEl = document.getElementById("password");
  const pass = passEl?.value?.trim() || "";

  if (pass === CORRECT_PASSWORD) {
    localStorage.setItem(LS_KEY, "1");
    enforceLock();
    passEl.value = "";
  } else {
    alert("Wrong password. Try again.");
    localStorage.removeItem(LS_KEY);
    passEl.value = "";
    passEl.focus();
  }
}

function logout() {
  localStorage.removeItem(LS_KEY);
  enforceLock();
}

document.addEventListener("DOMContentLoaded", () => {
  enforceLock();

  // Submit on Enter in the password field (form handles it, this is extra safety)
  document.getElementById("password")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPassword(e);
  });

  // ===== Sidebar controls =====
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleBtn = document.getElementById("sidebarToggle");
  const insideCloseBtn = document.getElementById("sidebarClose");

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    toggleBtn?.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    toggleBtn?.setAttribute("aria-expanded", "false");
  }

  function toggleSidebar() {
    if (sidebar.classList.contains("-translate-x-full")) openSidebar();
    else closeSidebar();
  }

  toggleBtn?.addEventListener("click", toggleSidebar);
  overlay?.addEventListener("click", closeSidebar);
  insideCloseBtn?.addEventListener("click", closeSidebar);

  // Close sidebar after clicking a link on mobile
  sidebar?.querySelectorAll('a[target="content"]').forEach((a) => {
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1023px)").matches) closeSidebar();
    });
  });

  // Optional: close on Escape (mobile)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
});

// Expose if you want a logout link somewhere
window.logout = logout;
