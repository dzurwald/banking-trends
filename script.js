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

  // Enter submits
  document.getElementById("password")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPassword(e);
  });

  // ===== Sidebar controls (mobile + desktop) =====
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleBtn = document.getElementById("sidebarToggle");
  const insideCloseBtn = document.getElementById("sidebarClose");
  const contentWrap = document.getElementById("contentWrap"); // shifts on desktop

  function isDesktop() {
    return window.matchMedia("(min-width: 1024px)").matches; // lg breakpoint
  }

  function applyDesktopShift(open) {
    // Shift the content right when the fixed sidebar is visible on desktop
    if (!contentWrap) return;
    if (open) {
      contentWrap.classList.add("lg:ml-72");
    } else {
      contentWrap.classList.remove("lg:ml-72");
    }
  }

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    toggleBtn?.setAttribute("aria-expanded", "true");
    if (isDesktop()) {
      // No overlay on desktop; keep it hidden and shift content instead
      overlay.classList.add("hidden");
      applyDesktopShift(true);
    }
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    toggleBtn?.setAttribute("aria-expanded", "false");
    if (isDesktop()) {
      applyDesktopShift(false);
    }
  }

  function toggleSidebar() {
    if (sidebar.classList.contains("-translate-x-full")) openSidebar();
    else closeSidebar();
  }

  toggleBtn?.addEventListener("click", toggleSidebar);
  overlay?.addEventListener("click", closeSidebar);
  insideCloseBtn?.addEventListener("click", toggleSidebar); // acts like collapse on desktop

  // Close sidebar after clicking a link on mobile
  sidebar?.querySelectorAll('a[target="content"]').forEach((a) => {
    a.addEventListener("click", () => {
      if (!isDesktop()) closeSidebar();
    });
  });

  // Escape closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // Initial state: open on desktop, closed on mobile
  function setInitialSidebar() {
    if (isDesktop()) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }
  setInitialSidebar();

  // Handle resize breakpoint changes
  let prevDesktop = isDesktop();
  window.addEventListener("resize", () => {
    const nowDesktop = isDesktop();
    if (nowDesktop !== prevDesktop) {
      prevDesktop = nowDesktop;
      setInitialSidebar();
    }
  });
});

// Expose if you want a logout link somewhere
window.logout = logout;
